const About = require('../models/About');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Blog = require('../models/Blog');
const Experience = require('../models/Experience');
const Testimonial = require('../models/Testimonial');
const Service = require('../models/Service');
const Message = require('../models/Message');

// =============== ABOUT CONTROLLERS ===============
exports.getAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    
    // Create default about if none exists
    if (!about) {
      about = await About.create({
        title: 'About Me',
        name: 'Your Name',
        role: 'Full Stack Developer',
        bio: 'Write your bio here...',
        shortBio: 'Short bio for hero section...',
        email: 'you@example.com',
        location: 'Your City, Country',
        socialLinks: {
          github: '',
          linkedin: '',
          twitter: '',
          instagram: ''
        },
        stats: {
          projects: 0,
          clients: 0,
          experience: 0,
          awards: 0
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAbout = async (req, res, next) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await about.update(req.body);
    }
    
    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    next(error);
  }
};

// =============== SKILL CONTROLLERS ===============
exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    
    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    await skill.update(req.body);
    
    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    await skill.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// =============== PROJECT CONTROLLERS ===============
exports.getProjects = async (req, res, next) => {
  try {
    const { featured, published, category } = req.query;
    const where = {};
    
    if (featured) where.featured = featured === 'true';
    if (published !== undefined) where.published = published === 'true';
    if (category) where.category = category;
    
    const projects = await Project.findAll({
      where,
      order: [['order', 'ASC'], ['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

exports.getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      where: { slug: req.params.slug }
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    await project.update(req.body);
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    await project.destroy();
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Similar controllers for Blog, Experience, Testimonial, Service
// Due to length, I'll show pattern and you can implement similarly

// =============== BLOG CONTROLLERS ===============
exports.getBlogs = async (req, res, next) => {
  try {
    const { published, featured, category } = req.query;
    const where = {};
    
    if (published !== undefined)