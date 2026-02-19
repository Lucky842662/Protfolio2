import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from 'react-icons/fa';
import './Project.css';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.',
      image: '/images/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      github: 'https://github.com',
      live: 'https://demo.com',
      category: 'fullstack',
      features: [
        'Real-time inventory management',
        'Payment processing with Stripe',
        'Admin dashboard with analytics',
        'User authentication & authorization',
        'Order tracking system'
      ],
      challenges: 'Implemented real-time inventory updates using WebSockets and optimized database queries for high traffic.'
    },
    {
      id: 2,
      title: 'TaskFlow - Project Management',
      description: 'Collaborative project management tool with drag-drop interface, real-time updates, and team features.',
      image: '/images/projects/taskflow.jpg',
      technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io', 'Tailwind'],
      github: 'https://github.com',
      live: 'https://demo.com',
      category: 'fullstack',
      features: [
        'Drag-and-drop task management',
        'Real-time collaboration',
        'Team workspaces',
        'File attachments',
        'Activity logging'
      ]
    },
    {
      id: 3,
      title: 'Social Analytics Dashboard',
      description: 'Real-time social media analytics dashboard with data visualization and reporting.',
      image: '/images/projects/analytics.jpg',
      technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'Chart.js'],
      github: 'https://github.com',
      live: 'https://demo.com',
      category: 'frontend',
      features: [
        'Interactive data visualizations',
        'Real-time metrics updates',
        'Custom report generation',
        'Multi-platform integration',
        'Export functionality'
      ]
    },
    {
      id: 4,
      title: 'API Gateway Service',
      description: 'Scalable API gateway with rate limiting, authentication, and request routing.',
      image: '/images/projects/api.jpg',
      technologies: ['Node.js', 'Express', 'Redis', 'JWT', 'Docker'],
      github: 'https://github.com',
      live: 'https://demo.com',
      category: 'backend',
      features: [
        'Rate limiting & throttling',
        'JWT authentication',
        'Request routing',
        'Request/response transformation',
        'Metrics collection'
      ]
    },
    {
      id: 5,
      title: 'Real-time Chat Application',
      description: 'Feature-rich chat application with rooms, direct messages, and file sharing.',
      image: '/images/projects/chat.jpg',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
      github: 'https://github.com',
      live: 'https://demo.com',
      category: 'fullstack',
      features: [
        'Real-time messaging',
        'Private and group chats',
        'File sharing',
        'Typing indicators',
        'Read receipts'
      ]
    },
    {
      id: 6,
      title: 'Portfolio Generator',
      description: 'CLI tool that generates beautiful portfolio websites from configuration files.',
      image: '/images/projects/cli.jpg',
      technologies: ['Node.js', 'React', 'TypeScript', 'Commander.js', 'EJS'],
      github: 'https://github.com',
      npm: 'https://npmjs.com',
      category: 'tool',
      features: [
        'CLI interface',
        'Template system',
        'Customizable themes',
        'Auto-deployment',
        'Markdown support'
      ]
    }
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'fullstack', label: 'Full Stack' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'tool', label: 'Tools' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      id="projects" 
      className="projects"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={itemVariants}>
          _featured projects
        </motion.h2>

        <motion.div className="project-filters" variants={itemVariants}>
          {filters.map((f, index) => (
            <motion.button
              key={index}
              className={`filter-btn ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <FaCode className="placeholder-icon" />
                </div>
                <div className="project-overlay">
                  <motion.button
                    className="view-details"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <FaEye /> View Details
                  </motion.button>
                </div>
              </div>

              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag">+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className="project-links">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub /> Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt /> Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="projects-footer" variants={itemVariants}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-all"
          >
            View all on GitHub <FaGithub />
          </a>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>×</button>
              
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              <div className="modal-section">
                <h3>Description</h3>
                <p>{selectedProject.description}</p>
              </div>

              <div className="modal-section">
                <h3>Key Features</h3>
                <ul className="feature-list">
                  {selectedProject.features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              {selectedProject.challenges && (
                <div className="modal-section">
                  <h3>Challenges Solved</h3>
                  <p>{selectedProject.challenges}</p>
                </div>
              )}

              <div className="modal-section">
                <h3>Technologies Used</h3>
                <div className="modal-tech">
                  {selectedProject.technologies.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="modal-links">
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View Code
                </a>
                <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Projects;