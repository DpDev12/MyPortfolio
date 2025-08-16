import "../../../css/main.css";
import "../../../css/scrollbar.css";
import Paul from "../../../../public/assets/photos/paul.jpg";
import { TfiArrowCircleLeft } from "react-icons/tfi";
import { FaArrowDown, FaDev, FaDiscord, FaFacebookSquare, FaGithub, FaHtml5, FaJava, FaLightbulb, FaLinkedin, FaPaintBrush, FaReact, FaTimes} from "react-icons/fa";
import { IoGitBranch } from "react-icons/io5";
import { SiPhp } from "react-icons/si";
import { HiDatabase } from "react-icons/hi";
import { IoIosTime } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { FaArrowsRotate } from "react-icons/fa6";
import { CgMail } from "react-icons/cg";
import { useSlider } from "../../hooks/useProjectSlider";
import { useTestimonialSlider } from "../../hooks/useTestimonialSlider";
import useContactForm from "../../hooks/useContactForm";
import Nav from "./components/nav";
import { FcOpenedFolder } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import InputError from "@/components/input-error";
import { Link } from "@inertiajs/react";
import { useProjectModal, useTestimonyModal, useUserModal } from "@/hooks/useGenericModal";
import { ProjectModal } from "@/components/Modal/ProjectModal";
import { TestimonyModal } from "@/components/Modal/TestimonialModal";
import { ViewModal } from "@/components/Modal/ViewModal";

//Animation
import { useTypewriter, useFadeIn, useInView, useCountUp, useBounceOnce, useBreatheOnce, useBounceIn, useDrop } from "@/hooks/useAnimationEffects";

export default function Portfolio({ userProjects, useTestimonials}) {
    const { isOpen, project, openProjectModal, closeModal } = useProjectModal();
    const { isOpen: isTestimonialOpen, testimony: selectedTestimonial, openTestimonyModal, closeModal: closeTestimonialModal } = useTestimonyModal();
    const { isOpen: isViewOpen, item: selectedItem, openViewModal, closeModal: closeViewModal } = useUserModal();

    const {
        currentIndex,
        currentProject,
        goToNext,
        goToPrev,
        goToSlide,
        totalProjects,
        hasProjects
    } = useSlider(userProjects, 3000);
    
    const {
        currentIndex: testimonialIndex,
        visibleTestimonials,
        goToNext: goToNextTestimonial,
        goToPrev: goToPrevTestimonial,
        goToSlide: goToTestimonialSlide,
        totalTestimonials,
        hasTestimonials
    } = useTestimonialSlider(useTestimonials, 4000);

    const {
        data,
        handleInputChange,
        handleSubmit,
        processing,
        statusMessage,
        errors,
    } = useContactForm();

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
        threshold: 1, 
        triggerOnce: false,
        rootMargin: '-50px 0px'
    });
    
    const [myExpBtnRef, myExpBtnInView] = useInView({ 
        threshold: 1, 
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
        direction: 'left'
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

    // Project count animation that resets on scroll
    const projectCount = useCountUp({
        end: userProjects?.length || 0,
        duration: 2000,
        trigger: skillsInView,
        suffix: '+',
        start: 0 // Reset to 0 each time
    });

    // Expertise button animation
    const { style: breatheOnce } = useBreatheOnce(1200, isInView);
    const titleFade = useFadeIn({
        delay: 200,
        duration: 1000,
        trigger: isInView,
        direction: 'up'
    });

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
                        {/* <h1 ref={helloRef} style={helloDrop.style} className="text-2xl md:text-4xl font-bold mb-2">
                            Hello, 
                            <span className="text-yellow-400 ml-2">
                                I am
                            </span>
                        </h1> */}
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
                        <div className="">
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

                        {/* <div className="fixed bottom-5 right-5 z-50 bg-slate-500 text-white text-lg font-bold flex items-center px-3 py-1 rounded-md shadow-lg">
                            <p className="mr-2">DP</p>
                            <span className="text-blue-300 text-4xl"><FaDev /></span>
                        </div> */}
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
                    <p ref={projectRef} style={projectFadeIn.style} className="text-slate-100 text-base md:text-lg mb-4 text-center lg:text-left">
                        Here are some of the projects I've built using React, Laravel, and other web technologies. These projects showcase my skills in full-stack development.
                    </p>
                   
                    {/* <div style={projectbtn.style} className="flex justify-center lg:justify-start"> */}
                    <div ref={myProjectBtnRef} style={myProjectBtnFadeIn.style} className="flex justify-center lg:justify-start">
                        <Link href={route('allproject')} className="text-center px-4 py-2 bg-white text-indigo-800 rounded hover:bg-gray-200 transition">
                            View All Projects
                        </Link>
                    </div>
                </div>

                {/* Right Column - Sliding Project Cards */}
                <div className="p-6 md:p-10 flex items-center justify-center order-1 lg:order-2">
                    {hasProjects ? (
                        <div className="relative w-full max-w-md">
                            {/* Project Card */}
                            <div className="bg-white rounded-xl shadow-md p-4 w-full">
                                <div className="h-48 w-full overflow-hidden rounded-md">
                                    {currentProject.image ? (
                                        <img
                                            src={`/storage/${currentProject.image}`}
                                            alt={currentProject.title}
                                            className="w-full h-full object-fit"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <FcOpenedFolder size={64} />
                                        </div>
                                    )}
                                </div>
                                
                                <h2 className="text-xl md:text-2xl font-bold mt-4 text-indigo-800">
                                    {currentProject.title}
                                </h2>
                                
                                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {currentProject.body}
                                </p>
                                
                                <div className="flex items-center justify-between mt-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                        currentProject.status === '1' ? 'bg-green-100 text-green-800' :
                                        currentProject.status === '0' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {currentProject.status === '1' ? 'Completed' : 'In Progress'}
                                    </span>
                                    
                                    <button 
                                        onClick={() => openProjectModal(currentProject)}
                                        className="cursor-pointer bg-indigo-600 text-white px-3 py-1 rounded text-sm hover:bg-indigo-700 transition">
                                        View Details
                                    </button>
                                </div>
                                
                                {(currentProject.start_date || currentProject.end_date) && (
                                    <div className="text-xs text-gray-500 mt-2">
                                        {currentProject.start_date && 
                                            `Start: ${new Date(currentProject.start_date).toLocaleDateString()}`
                                        }
                                        {currentProject.start_date && currentProject.end_date && ' • '}
                                        {currentProject.end_date && 
                                            `End: ${new Date(currentProject.end_date).toLocaleDateString()}`
                                        }
                                    </div>
                                )}
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={goToPrev}
                                className="absolute -left-8 md:-left-16 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300 z-30"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={goToNext}
                                className="absolute -right-8 md:-right-16 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300 z-30"
                            >
                                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Dots Indicator */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {userProjects.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition ${
                                            index === currentIndex 
                                                ? 'bg-indigo-600' 
                                                : 'bg-gray-300 hover:bg-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Project Counter */}
                            <div className="text-center mt-2 text-gray-600 text-sm">
                                {currentIndex + 1} of {totalProjects}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md text-center">
                            <FcOpenedFolder size={64} className="mx-auto mb-4" />
                            <h2 className="text-xl md:text-2xl font-bold text-indigo-800 mb-2">No Projects Yet</h2>
                            <p className="text-gray-600">
                                Projects will be showcased here soon!
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* SKILLS SECTION */}
            <div id="skill" className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left Column - Expertise */}
                <div className="bg-indigo-900 text-white p-6 md:p-10 lg:pl-10 lg:pr-32 flex flex-col justify-center clip-left-slope order-2 lg:order-1">
                    <h1 ref={expertiseRef} style={expertiseFadeIn.style} className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 text-center lg:text-left">My Expertise</h1>
                    <p ref={skillsRef} style={skillsFadeIn.style} className="text-base md:text-lg text-justify mb-6">
                        As a dedicated web developer, I specialize in creating modern, responsive applications using React, Laravel, and cutting-edge web technologies.
                    </p>
                    
                    {/* Animated Project Counter */}
                    <div className="text-center lg:text-left mb-6">
                        <div className="text-3xl font-bold text-yellow-400">
                            {projectCount} Projects Completed
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
                <div style={skillsFadeIn.style} className="p-6 md:p-10 order-1 lg:order-2 flex justify-center items-center">
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
                
                {hasTestimonials ? (
                    <div className="relative max-w-6xl mx-auto">
                        {/* Desktop 3-card layout */}
                        <div className="hidden md:flex justify-center items-center gap-4 perspective-1000">
                            {visibleTestimonials.map((testimonial, idx) => {
                                const isCenter = idx === 1;
                                const isLeft = idx === 0;
                                const isRight = idx === 2;
                                
                                return (
                                    <div
                                        key={idx} 
                                        className={`bg-white shadow-lg rounded-3xl p-4 transition-all duration-500 ease-in-out transform ${
                                            isCenter 
                                                ? 'w-[350px] scale-105 z-20 shadow-2xl' 
                                                : 'w-[300px] scale-85 z-10 blur-sm opacity-50'
                                        } ${
                                            isLeft ? '-rotate-y-12' : isRight ? 'rotate-y-12' : ''
                                        }`}
                                        style={{
                                            ...(isCenter ? breatheOnce : {}),
                                            transform: isCenter 
                                                ? 'scale(1) translateZ(0)' 
                                                : isLeft 
                                                    ? 'scale(0.9) translateX(-20px) rotateY(-15deg)' 
                                                    : 'scale(0.9) translateX(20px) rotateY(15deg)'
                                        }}
                                    >
                                        <div className={`${isCenter ? 'h-56' : 'h-44'} w-full overflow-hidden rounded-2xl mb-4 transition-all duration-500`}>
                                            <img
                                                src={`/storage/${testimonial.image}`}
                                                alt={testimonial.name || "Client"}
                                                className="w-full h-full object-fit"
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <h2 className={`font-bold text-indigo-900 ${isCenter ? 'text-xl' : 'text-lg'} transition-all duration-500`}>
                                                {testimonial.name || "Client Name"}
                                            </h2>
                                            <p className={`text-gray-500 ${isCenter ? 'text-sm' : 'text-xs'} transition-all duration-500`}>
                                                {testimonial.title || "CEO @ Company"}
                                            </p>
                                        </div>

                                        <div className="mb-3">
                                            <span className={`text-gray-600 font-bold mr-1 ${isCenter ? 'text-sm' : 'text-xs'} transition-all duration-500`}>From:</span>
                                            <span className={`text-gray-500 ${isCenter ? 'text-sm' : 'text-xs'} transition-all duration-500`}>
                                                {testimonial.location || "Client Country"}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <p className={`text-gray-700 italic ${isCenter ? 'text-sm' : 'text-xs'} transition-all duration-500 truncate`}>
                                                "{testimonial.testimonial || 'Great work and excellent service!'}"
                                            </p>
                                        </div>

                                        {isCenter && (
                                            <button 
                                                onClick={() => openTestimonyModal(testimonial)}
                                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 cursor-pointer">
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Mobile single card layout */}
                        <div className="md:hidden flex justify-center">
                            <div 
                                style={breatheOnce}
                                className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-sm">
                                <div className="h-48 w-full overflow-hidden rounded-2xl mb-4">
                                    <img
                                        src={`/storage/${visibleTestimonials[1]?.image}`}
                                        alt={visibleTestimonials[1]?.name || "Client"}
                                        className="w-full h-full object-fit"
                                    />
                                </div>

                                <div className="mb-2">
                                    <h2 className="font-bold text-indigo-900 text-lg">
                                        {visibleTestimonials[1]?.name || "Client Name"}
                                    </h2>
                                    <p className="text-gray-500 text-sm">
                                        {visibleTestimonials[1]?.title || "CEO @ Company"}
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <span className="text-gray-600 font-bold mr-1 text-sm">From:</span>
                                    <span className="text-gray-500 text-sm">
                                        {visibleTestimonials[1]?.location || "Client Country"}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <p className="text-gray-700 italic text-sm">
                                        "{visibleTestimonials[1]?.testimonial || 'Great work and excellent service!'}"
                                    </p>
                                </div>

                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200">
                                    View Details
                                </button>
                            </div>
                        </div>

                        {/* Navigation buttons */}
                        <button
                            onClick={goToPrevTestimonial}
                            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg rounded-full p-2 md:p-3 hover:bg-white hover:scale-110 transition-all duration-300 z-30"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={goToNextTestimonial}
                            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur shadow-lg rounded-full p-2 md:p-3 hover:bg-white hover:scale-110 transition-all duration-300 z-30"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div style={titleFade.style} className="text-center text-gray-500">
                        No testimonials available
                    </div>
                )}
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
                            <a href="mailto:paulargiepurisima@gmail.com" className="text-slate-100 underline font-medium hover:bg-slate-50 hover:text-blue-600 break-all">
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
                <div className="p-6 md:p-10 lg:p-20 flex flex-col justify-center order-1 lg:order-2">
                    <div ref={conGRef} style={conGFadeIn.style} className="bg-white rounded-3xl p-6 md:p-10">
                        <h1 className="text-slate-700 text-2xl md:text-3xl font-bold pb-5 text-center">Contact Me</h1>

                        <form onSubmit={handleSubmit} className="space-y-2 text-gray-900">
                            <div className="w-full">
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Name</label>
                                <input
                                    type="text"
                                    placeholder="Juan Dela Cruz"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                                    name="name"
                                    value={data.name}
                                    onChange={handleInputChange}
                                /> 
                                <InputError message={errors.name} />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Email</label>
                                <input
                                    type="email"
                                    placeholder="your@gmail.com"
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                                    name="email"
                                    value={data.email}
                                    onChange={handleInputChange}
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Project Type</label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                                    name="project"
                                    value={data.project}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Select Project Type</option>
                                    <option value="web_development">Web Development</option>
                                    <option value="mobile_app">Mobile App</option>
                                    <option value="consultation">Consultation</option>
                                    <option value="other">Other</option>
                                </select>
                                <InputError message={errors.project} />
                            </div>
                            <div>
                                <label className="block text-base md:text-lg font-medium text-gray-700 mb-1 text-left">Message</label>
                                <textarea
                                    placeholder="Your message..."
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base h-24 md:h-32"
                                    name="message"
                                    value={data.message}
                                    onChange={handleInputChange}
                                ></textarea>
                                <InputError message={errors.message} />
                            </div>
                            <div className="mt-5">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center justify-center w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition text-sm md:text-base"
                                >
                                    {processing && <Loader2 className="animate-spin w-4 h-4 mr-2"/>}
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ProjectModal 
                project={project} 
                isOpen={isOpen} 
                onClose={closeModal} 
            />

            <TestimonyModal 
                testimony={selectedTestimonial} 
                isOpen={isTestimonialOpen} 
                onClose={closeTestimonialModal} 
            />

            <ViewModal 
                item={selectedItem} 
                isOpen={isViewOpen} 
                onClose={closeViewModal} 
            />
        </div>

        
    );
}