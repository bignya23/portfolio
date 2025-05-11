interface BotResponse {
  text: string;
  links?: { text: string; url: string }[];
}

const generateResponse = (query: string): BotResponse => {
  const lowerQuery = query.toLowerCase();
  
  // Project-related queries
  if (lowerQuery.includes('project') || lowerQuery.includes('work') || lowerQuery.includes('portfolio')) {
    return {
      text: "I've worked on several exciting projects including:\n\n1. Neural Network Visualizer - An interactive tool to visualize neural network architectures and training\n2. Custom OS Kernel Component - Developed memory management subsystem in C++\n3. Real-time AI Inference Pipeline - Built low-latency ML inference system for edge devices\n4. Multimodal Chatbot - Combined vision and language models for enhanced user interactions",
      links: [
        { text: "View GitHub", url: "https://github.com" },
        { text: "Project Demo", url: "https://example.com/demo" }
      ]
    };
  }
  
  // AI/ML related queries
  if (lowerQuery.includes('ai') || lowerQuery.includes('ml') || lowerQuery.includes('machine learning') || lowerQuery.includes('deep learning')) {
    return {
      text: "I specialize in deep learning, natural language processing, and AI optimization. I've built models for computer vision, NLP, and reinforcement learning. My recent work focuses on efficient inference and model quantization for deployment on resource-constrained devices.",
      links: [
        { text: "AI Research Paper", url: "https://arxiv.org" }
      ]
    };
  }
  
  // Skills and tools
  if (lowerQuery.includes('skill') || lowerQuery.includes('tool') || lowerQuery.includes('tech') || lowerQuery.includes('stack')) {
    return {
      text: "Technical Skills:\n• Languages: C++, Python, Rust, TypeScript\n• AI/ML: PyTorch, TensorFlow, CUDA, JAX\n• Systems: Linux Kernel, RTOS, Memory Management\n• Web: React, Node.js, GraphQL\n• Tools: Docker, Git, CMake, GDB",
    };
  }
  
  // Experience and background
  if (lowerQuery.includes('experience') || lowerQuery.includes('background') || lowerQuery.includes('history')) {
    return {
      text: "I have 5+ years of experience in low-level systems and AI development:\n\n• Senior AI Engineer at TechCorp (2021-Present)\n• Systems Developer at KernelSystems (2019-2021)\n• Research Assistant at AI Lab, Tech University (2017-2019)\n\nI hold an MSc in Computer Science with focus on AI and Systems Programming.",
    };
  }
  
  // Education
  if (lowerQuery.includes('education') || lowerQuery.includes('degree') || lowerQuery.includes('university') || lowerQuery.includes('college')) {
    return {
      text: "Education:\n• MSc in Computer Science, Tech University (2017-2019)\n• BSc in Computer Engineering, Engineering College (2013-2017)\n\nRelevant Courses: Advanced Algorithms, Machine Learning, Operating Systems, Computer Architecture, Distributed Systems",
    };
  }
  
  // Contact information
  if (lowerQuery.includes('contact') || lowerQuery.includes('email') || lowerQuery.includes('phone') || lowerQuery.includes('reach')) {
    return {
      text: "You can reach me at:\n• Email: sanjay@example.com\n• LinkedIn: linkedin.com/in/sanjaysingh\n• GitHub: github.com/sanjaysingh",
      links: [
        { text: "Download Resume (PDF)", url: "#" }
      ]
    };
  }
  
  // Resume download
  if (lowerQuery.includes('resume') || lowerQuery.includes('cv') || lowerQuery.includes('download')) {
    return {
      text: "You can download my full resume with detailed project descriptions and work history.",
      links: [
        { text: "Download Resume (PDF)", url: "#" }
      ]
    };
  }
  
  // About me / personal
  if (lowerQuery.includes('about') || lowerQuery.includes('personal') || lowerQuery.includes('hobby') || lowerQuery.includes('interest')) {
    return {
      text: "Beyond coding, I enjoy competitive programming, contributing to open-source projects, and speaking at tech conferences. In my free time, I explore hardware hacking projects and participate in AI research competitions.",
    };
  }
  
  // Introduction / greeting
  if (lowerQuery.includes('hi') || lowerQuery.includes('hello') || lowerQuery.includes('hey') || lowerQuery.includes('greetings') || lowerQuery.length < 5) {
    return {
      text: "Hello! I'm Sanjay's interactive resume bot. I can tell you about his projects, skills, experience, or anything else you'd like to know about his professional background. What would you like to learn about?",
    };
  }
  
  // Fallback response
  return {
    text: "I'm not sure I understand that question. You can ask me about Sanjay's projects, skills, experience, education, or contact information. Or try one of the suggested questions below.",
  };
};

export default generateResponse;