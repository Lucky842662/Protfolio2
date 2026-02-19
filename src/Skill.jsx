import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaAws, 
  FaDocker, 
  FaGitAlt, 
  FaDatabase, 
  FaServer,
  FaCloud  // ← THIS WAS MISSING
} from 'react-icons/fa';
import { 
  SiMongodb, 
  SiExpress, 
  SiPostgresql, 
  SiTypescript, 
  SiJavascript, 
  SiRedux,
  SiTailwindcss, 
  SiGraphql, 
  SiFirebase,
  SiKubernetes, 
  SiJenkins, 
  SiRedis
} from 'react-icons/si';
import './Skill.css';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skillCategories = [
    {
      name: 'Frontend',
      icon: <FaReact />,
      skills: [
        { name: 'React', icon: <FaReact />, level: 90 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 85 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 95 },
        // { name: 'Redux', icon: <SiRedux />, level: 85 },
        { name: 'Tailwind', icon: <SiTailwindcss />, level: 80 },
        // { name: 'GraphQL', icon: <SiGraphql />, level: 75 }
      ]
    },
    {
      name: 'Backend',
      icon: <FaServer />,
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 90 },
        { name: 'Express', icon: <SiExpress />, level: 90 },
        { name: 'Python', icon: <FaPython />, level: 80 },
        { name: 'REST APIs', icon: <FaServer />, level: 95 },
        { name: 'GraphQL', icon: <SiGraphql />, level: 75 }
      ]
    },
    {
      name: 'Database',
      icon: <FaDatabase />,
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 90 },
        { name: 'PostgreSQL', icon: <SiPostgresql />, level: 85 },
        // { name: 'Redis', icon: <SiRedis />, level: 70 },
        // { name: 'Firebase', icon: <SiFirebase />, level: 80 }
      ]
    },
    {
      name: 'AI',
      icon: <FaCloud />,  // ← THIS USES FaCloud
      skills: [
        { name: 'Cursor',  level: 75 },
        { name: 'Lovable', level: 80 },
        { name: 'Openclaw',  level: 65 },
        { name: 'N8N', level: 70 },
        { name: 'Antigravity',  level: 90 }
      ]
    }
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
      id="skills" 
      className="skills"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={itemVariants}>
          _tech stack
        </motion.h2>

        <div className="skills-container">
          {skillCategories.map((category, catIndex) => (
            <motion.div 
              key={catIndex}
              className="skill-category"
              variants={itemVariants}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-name">{category.name}</h3>
              </div>

              <div className="skills-grid">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    className="skill-card"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-name">{skill.name}</div>
                    <div className="skill-level">
                      <div 
                        className="skill-progress"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <div className="skill-percentage">{skill.level}%</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;