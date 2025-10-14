import "../../assets/css/main.css";
import "../../assets/css/scrollbar.css";
import Paul from "../../assets/image/paul.jpg";
import { FaArrowDown, FaDev, FaDiscord, FaFacebookSquare, FaGithub, FaHtml5, FaJava, FaLightbulb, FaLinkedin, FaPaintBrush, FaReact} from "react-icons/fa";
import { IoGitBranch } from "react-icons/io5";
import { SiPhp } from "react-icons/si";
import { HiDatabase } from "react-icons/hi";
import { IoIosTime } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { FaArrowsRotate, FaRegMessage } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import Nav from "./components/nav";
import { FcOpenedFolder } from "react-icons/fc";
import { ViewModalCV } from "../../components/Modal/ViewModalCV";
import { useUserModal, useViewProjectModal } from "../../hooks/useGenericModal";


//Animation
import { useTypewriter, 
    useFadeIn, 
    useInView, 
    useBounceOnce, 
    useBounceIn, 
    useDrop,
    useBreatheOnce
} from "../../hooks/useAnimationEffects";
import { ViewProjectModal } from "@/components/Modal/ViewProjectModal";


export default function Portfolio() {

    const { isOpen: isViewOpen, item: selectedItem, openViewModal, closeModal: closeViewModal } = useUserModal();
    const { isOpen: isProjOpen, item: selectedProj, openViewProjectModal, closeModal: closeProjModal } = useViewProjectModal();

    // Animation - Initial load animations (one-time)
    const jobTitles = [
        "Web Developer",
        "UI/UX Designer",
        "React Developer",
        "Laravel Developer",
        "Frontend Developer",
        "Full Stack Developer"
    ];

    const { text: animatedTitle } = useTypewriter({
        texts: jobTitles,
        typeSpeed: 60,
        backSpeed: 30,
        pauseTime: 1000,
        loop: true,
        startDelay: 0
    });

    // Initial load animations (these stay the same)
    
    const dropName = useDrop('drop', 800, 600);
    const dropLName = useDrop('drop', 800, 900);
    const drophello = useDrop('drop', 800, 300);
    // const nav = useSlideIn('down', 600, 600);
   
    const [letConnectRef, letConnectInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false, // Changed to false for repeating animations
        rootMargin: '-50px 0px' // Added margin for better trigger timing
    });
    const [homeBtnRef, homeBtnInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false, // Changed to false for repeating animations
        rootMargin: '-50px 0px' // Added margin for better trigger timing
    });

    const [aboutRef, aboutInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false, // Changed to false for repeating animations
        rootMargin: '-50px 0px' // Added margin for better trigger timing
    });

    const [myProjectRef, myProjectInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });
    const [myProjectBtnRef, myProjectBtnInView] = useInView({ 
        threshold: 0.1, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });
    
    const [myExpBtnRef, myExpBtnInView] = useInView({ 
        threshold: 0.1, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    const [projectRef, projectInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    const [expertiseRef, expertiseInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    const [skillsRef, skillsInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });
    
    const [skillsOutRef, skillsOutView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    const [getintouchRef, getintouchInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    const [conRef, conInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    const [projRef, projInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    }); 
    
    const [testRef, testInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });
    
    const [conGRef, conGInView] = useInView({ 
        threshold: 0.2, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    // Contact section social media animations - repeating
    const [contactHomeSocialRef, contactHomeSocialInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });
    const [contactSocialRef, contactSocialInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });

    //Use InView to trigger animations when section comes into view
    const [sectionRef, isInView] = useInView({ 
        threshold: 0.3, 
        triggerOnce: true 
    });

    // Scroll-triggered fade animations

    const letConnectFadeIn = useFadeIn({
        trigger: letConnectInView,
        duration: 800,
        delay: 100,
        direction: 'right'
    });

    const aboutFadeIn = useFadeIn({
        trigger: aboutInView,
        duration: 800,
        delay: 100,
        direction: 'up'
    });
    
    const myProjectFadeIn = useFadeIn({
        trigger: myProjectInView,
        duration: 800,
        delay: 100,
        direction: 'down'
    });

    const projectFadeIn = useFadeIn({
        trigger: projectInView,
        duration: 800,
        delay: 100,
        direction: 'left'
    });

    const skillsOutFadeIn = useFadeIn({
        trigger: skillsOutView,
        duration: 800,
        delay: 100,
        direction: 'left'
    });
    const skillsFadeIn = useFadeIn({
        trigger: skillsInView,
        duration: 800,
        delay: 100,
        direction: 'right'
    });

    const expertiseFadeIn = useFadeIn({
        trigger: expertiseInView,
        duration: 800,
        delay: 100,
        direction: 'down'
    });

    const getintouchFadeIn = useFadeIn({
        trigger: getintouchInView,
        duration: 800,
        delay: 100,
        direction: 'down'
    });

    const conFadeIn = useFadeIn({
        trigger: conInView,
        duration: 800,
        delay: 100,
        direction: 'right'
    });

    const conGFadeIn = useFadeIn({
        trigger: conGInView,
        duration: 800,
        delay: 100,
        direction: 'right'
    });

    // Repeating animations for contact social media
    const fb = useBounceOnce(100, 0, contactHomeSocialInView);
    const linkedin = useBounceOnce(500, 200, contactHomeSocialInView);
    const git = useBounceOnce(1000, 1500, contactHomeSocialInView);

    const homeBtnFadeIn = useBounceOnce(100, 0, homeBtnInView);
    const myProjectBtnFadeIn = useBounceIn(100, myProjectBtnInView);
    const myExpBtnFadeIn = useBounceIn(100, myExpBtnInView);

    const confb = useBounceOnce(100, 0, contactSocialInView);
    const conlinkedin = useBounceOnce(400, 0, contactSocialInView);
    const congit = useBounceOnce(800, 0, contactSocialInView);
    const condiscord = useBounceOnce(1200, 0, contactSocialInView);

    const proj = useBreatheOnce(500, projInView);
    const test = useBreatheOnce(500, testInView);

    // Expertise button animation
    const titleFade = useFadeIn({
        delay: 200,
        duration: 1000,
        trigger: isInView,
        direction: 'up'
    });

      // Method 1: Direct download from public folder
    const handleDownloadResume = () => {
      const link = document.createElement('a');
      link.href = '/PAUL_ARGIE_PURISIMA-RESUME-Updated.pdf'; // Place your PDF in public/resume.pdf
      link.download = 'Paul_Argie_Purisima-Resume.pdf';
      link.click();
    };

    return (
      
        <div className="px-4 md:px-10 bg-slate-300">
            {/* HOME SECTION */}
            <div id="home" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Profile */}
                <div className="relative bg-indigo-900 text-white p-6 md:p-10 clip-left-slope flex flex-col justify-between order-2 lg:order-1">
                    <div className="mt-0 flex justify-center lg:justify-start">
                        <img src={Paul} alt="Profile" className="w-60 h-32 md:w-80 md:h-40 object-cover rounded-full border-4 border-white"/>
                    </div>

                    <div className="text-center lg:text-left overflow-hidden">
                        <h1 style={drophello.style} className="text-2xl md:text-4xl font-bold mb-2">
                            Hello, 
                            <span className="text-yellow-400 ml-2">
                                I am
                            </span>
                        </h1>
                       
                        <h1 style={dropName.style} className="text-4xl md:text-6xl font-bold animate">Paul Argie</h1>
                        <h1 style={dropLName.style} className="text-4xl md:text-6xl font-bold">Purisima</h1>
                        <div  className="min-h-[3rem] flex items-center justify-center lg:justify-start">
                            <h5 className="text-xl md:text-2xl font-bold text-yellow-400">
                                {animatedTitle}
                                <span className="animate-pulse text-white ml-1">|</span>
                            </h5>
                        </div>
                    </div>

                    <div ref={contactHomeSocialRef} className="mt-0 mb-20 flex justify-center lg:justify-start">
                        <ul className="flex space-x-4 text-2xl">
                            <li style={fb.style}><FaFacebookSquare className="hover:scale-125 transition cursor-pointer"/></li>
                            <li style={linkedin.style}><FaLinkedin className="hover:scale-125 transition cursor-pointer"/></li>
                            <li style={git.style}><FaGithub className="hover:scale-125 transition cursor-pointer"/></li>
                        </ul>
                    </div>
                </div>

                {/* Right Column - Navigation & About */}
                <div className="grid grid-rows-2 order-1 lg:order-2 overflow-hidden">
                    {/* Top Half - Navigation & Connect */}
                    <div className="p-6 md:p-10 flex flex-col justify-between">
                        {/* <header style={nav.style} className="mb-6 md:mb-10"> */}
                        <header className="mb-6 md:mb-10">
                            <Nav />
                        </header>

                        <div ref={letConnectRef} style={letConnectFadeIn.style} className="mb-0 text-slate-800 text-center lg:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">Let's Connect!</h2>
                            <p>I'm excited to collaborate or discuss opportunities. Get my CV below and reach out!</p>
                        </div>
                        
                        <div ref={homeBtnRef} className="mt-4 flex justify-center lg:justify-start">
                            <button 
                                style={homeBtnFadeIn.style} 
                                onClick={handleDownloadResume}
                                className="group mt-0 bg-white text-blue-800 px-4 py-2 rounded-md flex items-center hover:bg-gray-200 transition cursor-pointer">
                                Download my CV <span className='mt-1 ml-1 group-hover:animate-bounce'><FaArrowDown /></span>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Half - About Me */}
                    <div ref={aboutRef} style={aboutFadeIn.style} className="p-6 md:p-10 text-slate-800">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center lg:text-left">About Me?</h2>
                        <p className="text-justify leading-relaxed mb-3">
                            I'm Paul Argie Purisima, a web developer passionate about creating meaningful digital solutions.
                        </p>
                        <div className="text-left">
                            <ul className="text-sm text-slate-700 space-y-1">
                                <li>✓ Expert in React, Laravel, and modern web technologies</li>
                                {/* <li>✓ 2+ years of hands-on web development experience</li> */}
                                <li>✓ Delivered multiple successful web applications</li>
                                <li>✓ Full-stack developer specializing in custom solutions</li>
                                {/* <li>✓ From concept to deployment - complete project lifecycle</li> */}
                                <li>✓ Specializes in user-friendly web applications</li>
                                <li>✓ Transforms business ideas into reality</li>
                            </ul>
                        </div>

                       
                    </div>
                    <div className="fixed bottom-5 right-5 z-50 bg-slate-500 text-white text-lg font-bold flex items-center px-3 py-1 rounded-md shadow-lg">
                        <p className="mr-2">DP</p>
                        <span className="text-blue-300 text-4xl"><FaDev /></span>
                    </div>
                </div>
            </div>

            {/* PROJECTS SECTION */}
            <div id="project" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Project Title & Description */}
                <div className="bg-indigo-900 text-white p-6 md:p-10 lg:pl-10 lg:pr-32 flex flex-col justify-center clip-left-slope order-2 lg:order-1">
                    <h1 ref={myProjectRef} style={myProjectFadeIn.style} className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 text-center lg:text-left">My Projects</h1>
                    <p ref={projectRef} style={projectFadeIn.style} className=" text-slate-100 text-base md:text-lg mb-4 text-center lg:text-left">
                        Here are some of the projects I've built using React, Laravel, and other web technologies. These projects showcase my skills in full-stack development.
                    </p>
                   
                    <div ref={myProjectBtnRef} className="flex justify-center lg:justify-start">
                        <button 
                            style={myProjectBtnFadeIn.style}
                            onClick={openViewProjectModal}
                            className="text-center px-4 py-2 bg-white text-indigo-800 rounded hover:bg-gray-200 transition"
                        >
                            View All Projects
                        </button>
                    </div>
                </div>

                {/* Right Column - Sliding Project Cards */}
                <div className="p-6 md:p-10 flex items-center justify-center order-1 lg:order-2">
                    <div ref={projRef} style={proj.style} className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
                        <FcOpenedFolder size={64} className="mx-auto mb-4" />
                        <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2">No Projects Yet</h2>
                        <p className="text-gray-600">
                            Projects will be showcased here soon!
                        </p>
                    </div>
                </div>
            </div>
            
            {/* SKILLS SECTION */}
            <div id="skill" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Expertise */}
                <div className="bg-indigo-900 text-white p-6 md:p-10 lg:pl-10 lg:pr-32 flex flex-col justify-center clip-left-slope order-2 lg:order-1">
                    <h1 ref={expertiseRef} style={expertiseFadeIn.style} className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 text-center lg:text-left">My Expertise</h1>
                    <p ref={skillsOutRef} style={skillsOutFadeIn.style} className="text-base md:text-lg text-justify mb-6">
                        As a dedicated web developer, I specialize in creating modern, responsive applications using React, Laravel, and cutting-edge web technologies.
                    </p>
                    
                    {/* Animated Project Counter */}
                    <div className="text-center lg:text-left mb-6">
                        <div className="text-3xl font-bold text-yellow-400">
                            (0)Projects Completed
                        </div>
                    </div>

                    <div ref={myExpBtnRef} className="flex justify-center lg:justify-start">
                        <button
                            style={myExpBtnFadeIn.style}
                            onClick={() => openViewModal({
                                title: "Complete Technical Stack",
                                description: "Detailed breakdown of my development skills and experience",
                                technologies: ["React.js", "Laravel", "JavaScript", "HTML/CSS", "MySQL", "Git/GitHub"],
                                experience: "2+ years of web development experience"
                            })}
                            className="bg-white text-indigo-800 px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer">
                            View More
                        </button>
                    </div>
                </div>

                {/* Right Column - Skills */}
                <div ref={skillsRef} style={skillsFadeIn.style} className="p-6 md:p-10 order-1 lg:order-2 flex justify-center items-center">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
                        {/* Sticky Header */}
                        <div className="sticky top-0 bg-amber-50 z-10 rounded-t-3xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 p-6 text-center lg:text-left">
                                Skills
                            </h2>
                        </div>
                        
                        {/* Scrollable Content with Custom Scrollbar */}
                        <div className="flex-1 overflow-y-auto px-7 pb-6 custom-scrollbar">
                            <div className="space-y-10 pt-2">
                                {/* Technical Skills */}
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-4">
                                        Technical Skills
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { icon: <FaHtml5 />, label: "HTML & CSS (Responsive)", value: 70, color: "bg-orange-600" },
                                            { icon: <IoGitBranch />, label: "Git/GitHub", value: 70, color: "bg-gray-600" },
                                            { icon: <FaReact />, label: "React.js", value: 60, color: "bg-blue-500" }, // Add React
                                            { icon: <FaJava />, label: "JavaScript (jQuery)", value: 55, color: "bg-yellow-500" },
                                            { icon: <SiPhp />, label: "PHP (Laravel)", value: 45, color: "bg-purple-600" },
                                            { icon: <HiDatabase />, label: "MySQL", value: 45, color: "bg-green-600" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="skill-item">
                                                <div className="flex items-center text-slate-800 mb-2">
                                                    <span className="text-xl md:text-2xl mr-3 text-indigo-600">
                                                        {item.icon}
                                                    </span>
                                                    <span className="font-semibold text-sm md:text-base">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden">
                                                    <div
                                                        className={`${item.color} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-center`}
                                                        style={{ width: `${item.value}%` }}
                                                    >
                                                        <span className="text-white text-xs font-medium">
                                                            {item.value}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Soft Skills */}
                                <div>
                                    <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-4">
                                        Soft Skills
                                    </h3>
                                    <div className="space-y-4">
                                        {[
                                            { icon: <IoIosTime />, label: "Time Management", value: 90, color: "bg-blue-600" },
                                            { icon: <RiTeamFill />, label: "Team Collaboration", value: 85, color: "bg-blue-400" },
                                            { icon: <FaLightbulb />, label: "Problem-Solving", value: 80, color: "bg-green-600" },
                                            { icon: <FaPaintBrush />, label: "Creativity", value: 85, color: "bg-yellow-500" },
                                            { icon: <FaArrowsRotate />, label: "Adaptability", value: 90, color: "bg-pink-500" },
                                        ].map((item, idx) => (
                                            <div key={idx} className="skill-items">
                                                <div className="flex items-center text-slate-800 mb-2">
                                                    <span className="text-xl md:text-2xl mr-3 text-indigo-600">
                                                        {item.icon}
                                                    </span>
                                                    <span className="font-semibold text-sm md:text-base">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden">
                                                    <div
                                                        className={`${item.color} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-center`}
                                                        style={{ width: `${item.value}%` }}
                                                    >
                                                        <span className="text-white text-xs font-medium">
                                                            {item.value}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            {/* TESTIMONIALS SECTION */}
            <div ref={sectionRef} id="testimonial" className="min-h-screen px-4 md:px-10 pt-10 md:pt-20">
                 <h1 className="text-center text-2xl md:text-3xl font-bold text-slate-700 mb-6">
                    Client Testimonials
                </h1>
                <div ref={testRef} style={test.style} className="flex items-center justify-center mt-20">
                    <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
                        <FaRegMessage size={64} className="mx-auto mb-4 text-yellow-700" />
                        <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2">No Testimonial Yet</h2>
                        <p className="text-gray-600">
                            Testimonial will be showcased here soon!
                        </p>
                    </div>
                </div>
            </div>
            
            {/* CONTACT SECTION */}
            <div id="contact" className='min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0'>
                {/* Left Column - Contact Info */}
                <div className="bg-indigo-900 p-6 md:p-10 lg:pl-10 lg:pr-32 flex flex-col justify-center clip-left-slope order-2 lg:order-1">
                    <h2 ref={getintouchRef} style={getintouchFadeIn.style} className="text-3xl md:text-5xl font-semibold text-slate-100 mt-0 mb-8 text-center">Get In Touch!</h2>
                    <p ref={conRef} style={conFadeIn.style} className="text-slate-100 mb-8 text-center">
                        Have a question or want to work together? Feel free to reach out!
                    </p>

                    {/* <div  ref={conGRef} style={conGFadeIn.style} className="mb-16 text-center"> */}
                    <div  ref={contactSocialRef} style={conGFadeIn.style} className="mb-16 text-center">
                        <p className="text-slate-100">You can also email me directly at:</p>
                        <div className="relative inline-block">
                            <a 
                                href="https://mail.google.com/mail/?view=cm&to=paulargiepurisima@gmail.com"  
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-slate-100 underline font-medium hover:bg-slate-50 hover:text-blue-600 break-all"
                            >
                                paulargiepurisima@gmail.com
                            </a>
                            <span className="absolute top-0 text-2xl md:text-3xl text-red-700"><CgMail /></span>
                        </div>
                    </div>

                    <div className="">
                        <ul className="flex space-x-4 md:space-x-6 justify-center items-center">
                            <li style={confb.style} className="text-2xl md:text-3xl hover:scale-150 transition">
                                <a 
                                    href="https://www.facebook.com/paulrj.prado/" 
                                    className="text-slate-100 hover:text-blue-700 transition" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook Profile"
                                >
                                    <FaFacebookSquare />
                                </a>
                            </li>
                            
                            <li style={conlinkedin.style} className="text-2xl md:text-3xl hover:scale-150 transition">
                                <a 
                                    href="https://www.linkedin.com/in/paul-argie-purisima-558145322" 
                                    className="text-slate-100 hover:text-blue-600 transition" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                >
                                    <FaLinkedin />
                                </a>
                            </li>

                            <li style={congit.style} className="text-2xl md:text-3xl hover:scale-150 transition">
                                <a 
                                    href="https://github.com/Hajkjaj" 
                                    className="text-slate-100 hover:text-slate-900 transition" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                >
                                    <FaGithub />
                                </a>
                            </li>
                          
                             <li style={condiscord.style} className="text-2xl md:text-3xl hover:scale-150 transition">
                                <a 
                                    href="https://discord.gg/YOUR_INVITE_CODE" 
                                    className="text-slate-100 hover:text-purple-700 transition" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Join Discord Server"
                                >
                                    <FaDiscord />
                                </a>
                            </li>
                           
                        </ul>
                    </div>
                </div>

                {/* Right Column - Contact Form */}
                <div 
                    onClick={openViewProjectModal}
                    className="p-6 md:p-10 lg:p-20 flex flex-col justify-center order-1 lg:order-2">
                    <div ref={conGRef} style={conGFadeIn.style} className="bg-white rounded-3xl p-6 md:p-10">
                        <h1 className="text-slate-700 text-2xl md:text-3xl font-bold pb-5 text-center">Contact Me</h1>

                        <form className="space-y-2 text-gray-900">
                            <div className="w-full">
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Name</label>
                                <input
                                    type="text"
                                    placeholder="Juan Dela Cruz"
                                    className="bg-slate-100 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                                    name="name"
                                /> 
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Email</label>
                                <input
                                    type="email"
                                    placeholder="your@gmail.com"
                                    className="bg-slate-100 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                                    name="email"
                                />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Project Type</label>
                                <select
                                    className="bg-slate-100 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                                    name="project"
                                >
                                    <option value="">Select Project Type</option>
                                    <option value="web_development">Web Development</option>
                                    <option value="mobile_app">Mobile App</option>
                                    <option value="consultation">Consultation</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Message</label>
                                <textarea
                                    placeholder="Your message..."
                                    className="bg-slate-100 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base h-24 md:h-32"
                                    name="message"
                                ></textarea>
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={openViewProjectModal}
                                    className="flex items-center justify-center w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ViewModalCV
                item={selectedItem} 
                isOpen={isViewOpen} 
                onClose={closeViewModal} 
            />
            <ViewProjectModal
                item={selectedProj} 
                isOpen={isProjOpen} 
                onClose={closeProjModal} 
            />
        </div>

        
    );
}