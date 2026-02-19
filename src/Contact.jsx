import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaCode, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ WORKING WHATSAPP INTEGRATION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Format message for WhatsApp
      const whatsappMessage = `*New Contact Form Submission*%0A%0A
*Name:* ${formData.name}%0A
*Email:* ${formData.email}%0A
*Subject:* ${formData.subject}%0A
*Message:* ${formData.message}`;

      // Your WhatsApp number (with country code, no + or spaces)
      const phoneNumber = '919001361980'; // Format: country code + number
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: 'Email', value: 'luckyshankhala9@gmail.com', link: 'mailto:luckyshankhala9@gmail.com' },
    { icon: <FaPhone />, label: 'Phone', value: '+91 9001361980', link: 'tel:+919001361980' },
    // { icon: <FaWhatsapp />, label: 'WhatsApp', value: '+91 9001361980', link: 'https://wa.me/919001361980' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Delhi, India', link: 'https://maps.google.com/?q=Delhi' }
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/luckyshankhala', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/luckyshankhala', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/luckyshankhala', label: 'Twitter' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/919001361980', label: 'WhatsApp' }
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
      id="contact" 
      className="contact"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <div className="container">
        <motion.h2 className="section-title" variants={itemVariants}>
          _get in touch
        </motion.h2>

        <div className="contact-container">
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="code-comment">&lt;!-- Let's collaborate --&gt;</div>
            
            <h3 className="info-title">Have a project in mind?</h3>
            <p className="info-description">
              I'm always interested in hearing about new opportunities, 
              interesting projects, or just having a chat about tech.
            </p>

            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="contact-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="contact-icon">{info.icon}</span>
                  <div className="contact-text">
                    <span className="contact-label">{info.label}</span>
                    <span className="contact-value">{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}   
            </div>

            <div className="availability">
              <div className="availability-dot"></div>
              <span>
              Hire me, and you're getting more than a resume. You're getting a Gen Z developer who understands that code is just one part of the package—the other parts? Creativity, communication, and looking good while getting things done.</span>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form" 
            variants={itemVariants}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <span className="line-number">01</span> name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <span className="line-number">02</span> email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                <span className="line-number">03</span> subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Project inquiry"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <span className="line-number">04</span> message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
                rows="5"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <span className="loading">Sending...</span>
              ) : (
                <span className="submit-text">
                  Send via WhatsApp <FaWhatsapp />
                </span>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div 
                className="success-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✓ WhatsApp opened! Send the message to contact me.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ✗ Something went wrong. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;