import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaGraduationCap, FaMedal } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const experiences = [
    {
      type: 'work',
      title: 'React Developer',
      company: 'Webkik Services',
      location: 'Tagore garden, Delhi',
      period: '3 months',
      description: [
        'Developed scalable RESTful APIs serving 500K+ requests daily',
        'Built responsive frontend applications with React and Redux',
        'Integrated third-party services and payment gateways',
        'Optimized database queries improving performance by 30%',
        'Collaborated with product team to define technical requirements'
      ],
      technologies: ['React', 'AI Agents', 'Design to coding', 'Chatbot', 'Ai voice calling assistant']
    },
    {
      type: 'Learning',
      title: 'React Developer',
      company: 'DICS',
      location: 'Punjabi bagh Delhi',
      period: '2024-2025',
      description: [
        'Built and maintained client websites using modern frameworks',
        'Participated in agile development sprints',
        'Fixed bugs and implemented new features',
        'Collaborated with design team for UI/UX improvements',
        'Learned industry best practices and coding standards'
      ],
      technologies: ['JavaScript', 'HTML', 'React.js', 'AI']
    },
    // {
    //   type: 'Learning',
    //   title: 'React Developer',
    //   company: 'DICS',
    //   location: 'Punjabi bagh Delhi',
    //   period: '2024-2025',
    //   description: [
    //     'Built and maintained client websites using modern frameworks',
    //     'Participated in agile development sprints',
    //     'Fixed bugs and implemented new features',
    //     'Collaborated with design team for UI/UX improvements',
    //     'Learned industry best practices and coding standards'
    //   ],
    //   technologies: ['JavaScript', 'HTML', 'React.js', 'AI']
    // },
    {
      type: 'education',
      title: 'B.Sc. in Science',
      institution: 'Rajasthan University',
      location: 'Jaipur,Rajasthan',
      period: '2021 - 2025',
      // achievements: [
      //   'GPA: 3.9/4.0',
      //   'Research Assistant in Distributed Systems',
      //   'Teaching Assistant for Web Development course',
      //   'Published paper on cloud computing'
      // ]
    },
    // {
    //   type: 'education',
    //   title: 'B.S. in Computer Science',
    //   institution: 'UC Berkeley',
    //   location: 'Berkeley, CA',
    //   period: '2011 - 2015',
    //   achievements: [
    //     'GPA: 3.8/4.0',
    //     'Dean\'s List for 6 semesters',
    //     'President of Coding Club',
    //     'Hackathon winner 3 times'
    //   ]
    // }
  ];

  const certifications = [
    {
      name: 'Full stack devloper',
      issuer: 'Dics Punjabi bagh',
      date: '2025',
      link: '#'
    },
    {
      name: 'React Developer',
      issuer: 'Webkik Services',
      date: '2026',
      link: '#'
    },
    // {
    //   name: 'Meta Backend Developer Certificate',
    //   issuer: 'Meta',
    //   date: '2022',
    //   link: '#'
    // },
    // {
    //   name: 'Google Cloud Professional Developer',
    //   issuer: 'Google',
    //   date: '2021',
    //   link: '#'
    // }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      id="experience" 
      className="experience"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={itemVariants}>
          _experience & education
        </motion.h2>

        <div className="experience-grid">
          <div className="experience-column">
            <motion.h3 className="column-title" variants={itemVariants}>
              <FaBriefcase /> Work Experience
            </motion.h3>
            
            <div className="timeline">
              {experiences.filter(exp => exp.type === 'work').map((exp, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-period">{exp.period}</div>
                    <h4 className="timeline-title">{exp.title}</h4>
                    <div className="timeline-subtitle">
                      {exp.company} • {exp.location}
                    </div>
                    <ul className="timeline-description">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    <div className="timeline-tech">
                      {exp.technologies?.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="experience-column">
            <motion.h3 className="column-title" variants={itemVariants}>
              <FaGraduationCap /> Education
            </motion.h3>
            
            <div className="timeline">
              {experiences.filter(exp => exp.type === 'education').map((exp, index) => (
                <motion.div 
                  key={index}
                  className="timeline-item"
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="timeline-dot education"></div>
                  <div className="timeline-content">
                    <div className="timeline-period">{exp.period}</div>
                    <h4 className="timeline-title">{exp.title}</h4>
                    <div className="timeline-subtitle">
                      {exp.institution} • {exp.location}
                    </div>
                    {/* <ul className="timeline-description">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul> */}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.h3 className="column-title" variants={itemVariants} style={{ marginTop: '50px' }}>
              <FaMedal /> Certifications
            </motion.h3>

            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <motion.a
                  key={index}
                  href={cert.link}
                  className="cert-card"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h4>{cert.name}</h4>
                  <p>{cert.issuer} • {cert.date}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;