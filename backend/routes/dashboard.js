const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Document = require('../models/Document');
const User = require('../models/user');

// GET /api/dashboard - Get user's documents and stats
router.get('/', fetchUser, async (req, res) => {
    try {
        // Get user's documents
        const documents = await Document.find({ user: req.user.id }).sort({ conversionDate: -1 });
        
        // Calculate stats
        const totalConversions = documents.length;
        const completedConversions = documents.filter(doc => doc.status === 'completed').length;
        const pendingConversions = documents.filter(doc => doc.status === 'pending').length;
        
        // Example recent activity from actual documents
        const recentActivity = documents.slice(0, 3).map(doc => ({
            task: `${doc.filename} → ${doc.convertedFormat}`,
            time: new Date(doc.conversionDate).toLocaleDateString()
        }));

        res.json({
            success: true,
            user: { id: req.user.id },
            documents,
            stats: { 
                totalConversions, 
                completedConversions, 
                pendingConversions,
                activeUsers: Math.floor(totalConversions * 0.3)
            },
            recentActivity,
            storageUsage: Math.min(100, totalConversions * 2)
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// POST /api/dashboard/documents - Create new document
router.post('/documents', fetchUser, async (req, res) => {
    try {
        const { filename, originalFormat, convertedFormat, fileSize } = req.body;
        
        const document = new Document({
            user: req.user.id,
            filename,
            originalFormat,
            convertedFormat,
            fileSize,
            status: 'completed'
        });

        await document.save();
        res.json({ success: true, document });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// PUT /api/dashboard/documents/:id - Update document
router.put('/documents/:id', fetchUser, async (req, res) => {
    try {
        const { filename, convertedFormat, status } = req.body;
        
        // Find document and verify ownership
        let document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        
        if (document.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        // Update fields
        if (filename) document.filename = filename;
        if (convertedFormat) document.convertedFormat = convertedFormat;
        if (status) document.status = status;

        await document.save();
        res.json({ success: true, document });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// DELETE /api/dashboard/documents/:id - Delete document
router.delete('/documents/:id', fetchUser, async (req, res) => {
    try {
        // Find document and verify ownership
        let document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).json({ success: false, message: 'Document not found' });
        }
        
        if (document.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'Not authorized' });
        }

        await Document.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Document deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;