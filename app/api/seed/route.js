import { getDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const sampleProjects = [
  {
    _id: "63987a49bdf0403bc411ad5b",
    title: "BestDeal E-commerce",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
      "Stripe",
    ],
    img: [
      "https://i.ibb.co/kJcNBzg/homepage-1.webp",
      "https://i.ibb.co/pz93F2R/dashboard-1.webp",
      "https://i.ibb.co/z8Qc7q8/productpage-1.webp",
    ],
    sitelink: "https://bestdeal-ecommerce.web.app/",
    codelink: "https://github.com/MdSalman2022/example/bestdeal",
    desc: "Established robust user authentication using Firebase, ensuring secure access and data protection. Engineered comprehensive dashboards for both admin and users, enhancing user management and experience. Ensured responsive design and enabled product, order, and shipment management with features for adding, deleting, editing, and searching items directly from the dashboard. Integrated Stripe for seamless and secure payment processing. Developed RESTful APIs for efficient frontend-backend data communication.",
    project_id: "1",
    project_type: "enterprise",
  },
  {
    _id: "63987a49bdf0403bc411ad5c",
    title: "Inventory Management System",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "AWS Amplify",
      "Lambda",
      "Express",
    ],
    img: [
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800",
      "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?w=800",
      "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282?w=800",
    ],
    sitelink: "https://inventory-system.vercel.app/",
    codelink: "https://github.com/MdSalman2022/example/inventory-system",
    desc: "Implemented user authentication with email/password and email verification using Firebase. Developed a comprehensive inventory management system enabling sellers to create shops, manage teams, and products efficiently. Implemented team and supplier management modules for seamless product creation and inventory control. Integrated discount management and automated order processing, including integration with Steadfast Courier. Designed and deployed an admin panel with features for account management, order oversight, and administrative controls.",
    project_id: "2",
    project_type: "enterprise",
  },
  {
    _id: "63987a49bdf0403bc411ad5d",
    title: "ChatGPT Enterprise Wrapper",
    technologies: [
      "Next.js",
      "Node.js",
      "OpenAI API",
      "MongoDB",
      "Tailwind CSS",
      "Socket.io",
    ],
    img: [
      "https://images.unsplash.com/photo-1677442135310-faaf87bb1582?w=800",
      "https://images.unsplash.com/photo-1694118551261-983b0537b2ed?w=800",
      "https://images.unsplash.com/photo-1692384723582-9955c5971404?w=800",
    ],
    sitelink: "https://ai-wrapper-demo.vercel.app/",
    codelink: "https://github.com/MdSalman2022/example/ai-enterprise-wrapper",
    desc: "Developed a customized ChatGPT integration solution for Convergent Computing, allowing secure AI-powered assistance within the organization. Built with a modern tech stack featuring Next.js for the frontend and Node.js for backend services. Implemented role-based access control, custom prompt templates, conversation history, and analytics dashboard. Ensured data privacy with enterprise-grade security features and seamless integration with existing company systems.",
    project_id: "3",
    project_type: "enterprise",
  },
  {
    _id: "63987a49bdf0403bc411ad5e",
    title: "Real-time Collaboration Platform",
    technologies: [
      "React",
      "Firebase",
      "Express",
      "Socket.io",
      "WebRTC",
      "Redux",
    ],
    img: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800",
    ],
    sitelink: "https://collab-platform.vercel.app/",
    codelink: "https://github.com/MdSalman2022/example/collaboration-platform",
    desc: "Engineered a comprehensive real-time collaboration platform featuring document editing, video conferencing, and team management capabilities. Implemented WebRTC for peer-to-peer video communications with low latency and high quality. Utilized Socket.io for real-time updates and Firebase for authentication and database services. Built a responsive interface with React and Redux for state management. Designed and implemented real-time notifications, activity logs, and team permission systems.",
    project_id: "4",
    project_type: "enterprise",
  },
  {
    _id: "63987a49bdf0403bc411ad5f",
    title: "Microservices API Gateway",
    technologies: [
      "Node.js",
      "Express",
      "Docker",
      "Kubernetes",
      "Redis",
      "PostgreSQL",
    ],
    img: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      "https://images.unsplash.com/photo-1557264305-7e2764da873b?w=800",
      "https://images.unsplash.com/photo-1633412802994-5c058f151b66?w=800",
    ],
    sitelink: "https://api-gateway-demo.herokuapp.com/",
    codelink: "https://github.com/MdSalman2022/example/api-gateway",
    desc: "Designed and implemented a scalable API gateway for a microservices architecture handling high-volume requests. Created a robust authentication and authorization system with JWT and role-based access control. Implemented rate limiting, request validation, and logging middleware for enhanced security and monitoring. Built with a containerized approach using Docker and Kubernetes for deployment, with Redis for caching and PostgreSQL for persistent data storage.",
    project_id: "5",
    project_type: "backend",
  },
];

export async function POST() {
  try {
    console.log("🌱 Starting database seeding...");

    const db = await getDatabase();
    const collection = db.collection("Projects");

    // Clear existing projects and insert sample data
    console.log("🗑️ Clearing existing projects...");
    await collection.deleteMany({});

    // Convert string IDs to ObjectId for proper MongoDB storage
    const projectsWithObjectIds = sampleProjects.map((project) => ({
      ...project,
      _id: new ObjectId(project._id),
    }));

    console.log("📥 Inserting sample projects...");
    const result = await collection.insertMany(projectsWithObjectIds);

    console.log(`✅ Successfully seeded ${result.insertedCount} projects`);
    return Response.json(
      {
        message: "Sample projects seeded successfully",
        count: result.insertedCount,
        projects: result.insertedIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Seed error:", error);
    return Response.json(
      {
        error: "Failed to seed projects",
        message: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
