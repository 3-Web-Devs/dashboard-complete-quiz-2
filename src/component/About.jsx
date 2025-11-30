import doc2 from "../assets/doc2.png";
import girl1 from "../assets/girl1.jpg";
import girl2 from "../assets/girl2.jpg";
import girl3 from "../assets/girl3.jpg";
export default function About() {
  const team = [
    {
      name: "Bismah Zermin",
      desc: "Hi, I'm Bismah Zermin, a passionate developer dedicated to creating seamless user experiences. With a keen eye for detail and a love for coding, I strive to build applications that are not only functional but also delightful to use.",
      img: girl1, // replace with actual photo
    },
    {
      name: "Aman Imtiaz",
      desc: "Hi, I'm Aman Imtiaz, a software engineer with a knack for problem-solving and a passion for innovation. I specialize in developing robust backend systems and scalable applications.",
      img: girl2, // replace with actual photo
    },
    {
      name: "Hamna Noor",
      desc: "Hi, I'm Hamna Noor, a front-end developer who loves bringing designs to life through code. I have a strong background in HTML, CSS, and JavaScript, and I'm always eager to learn new frameworks and technologies.",
      img: girl3, // replace with actual photo
    },
  ];

  return (
    <section className="py-24 px-8 w-full bg-gradient-to-r from-[#FFF9F3] to-[#F4F1EA] flex flex-col items-center">
      {/* --- TEAM INTRO SECTION --- */}
      <div className="max-w-6xl w-full mb-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#6F4E37] mb-16">
          Meet Our Team
        </h2>

        <div className="space-y-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between bg-white/70 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 backdrop-blur-sm"
            >
              {/* Text Section */}
              <div className="md:w-2/3 order-2 md:order-1 mt-6 md:mt-0">
                <h3 className="text-2xl font-bold text-[#6F4E37] mb-2">{member.name}</h3>
                <p className="text-[#D4AF37] font-semibold mb-3">{member.role}</p>
                <p className="text-[#382110]/80 leading-relaxed">{member.desc}</p>
              </div>

              {/* Image Section */}
              <div className="md:w-1/3 flex justify-center order-1 md:order-2">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-[#D4AF37]/60 shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- ORIGINAL ABOUT SECTION --- */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src={doc2}
            alt="About DocConverter"
            className="w-full h-[400px] object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
          />
        </div>

        <div className="md:w-1/2 text-left">
          <h2 className="text-4xl font-bold text-[#6F4E37] mb-6">
            Our Mission:
          </h2>
          <p className="text-lg text-[#382110] leading-relaxed">
           
            
            <strong>Our mission</strong> is to make file conversion effortless, fast, and accessible to everyone. We use cutting-edge AI and prioritize your privacy at every step.
            <br /><br />
            We’re continuously innovating to bring you more tools that make your work easier and smarter.
          </p>
        </div>
      </div>
    </section>
  );
}
