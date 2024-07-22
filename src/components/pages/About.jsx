/* eslint-disable react/prop-types */
import { FaLightbulb, FaUsers, FaChartLine } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const ValueCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg border transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
      <div className="text-4xl text-blue-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const TeamMember = ({ name, role, image }) => {
  return (
    <div className="p-6 rounded-lg text-center border transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4 transition-transform transform hover:rotate-6 hover:scale-110 duration-300 ease-in-out"
      />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
};

const About = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <div className="min-h-full p-2">
      <animated.header
        style={props}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">About PlanZen</h1>
          <p className="mt-2">Empowering productivity and organization</p>
        </div>
      </animated.header>

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="mb-4">
            PlanZen was founded in 2020 with a simple mission: to help
            individuals and teams maximize their productivity and achieve their
            goals. We believe that with the right tools and mindset, everyone
            can unlock their full potential.
          </p>
          <p>
            Our team of productivity experts and software engineers have worked
            tirelessly to create a comprehensive platform that addresses the
            most common challenges in personal and professional organization.
            From scheduling and budget management to habit tracking and team
            collaboration, PlanZen is designed to be your all-in-one
            productivity solution.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ValueCard
              icon={<FaLightbulb />}
              title="Innovation"
              description="We constantly strive to improve and innovate, bringing you the latest in productivity technology."
            />
            <ValueCard
              icon={<FaUsers />}
              title="User-Centric"
              description="Our users are at the heart of everything we do. We listen, learn, and adapt to meet your needs."
            />
            <ValueCard
              icon={<FaChartLine />}
              title="Efficiency"
              description="We believe in maximizing efficiency, both in our product and in how we operate as a company."
            />
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TeamMember
              name="Jane Doe"
              role="Founder & CEO"
              image="/api/placeholder/150/150"
            />
            <TeamMember
              name="John Smith"
              role="CTO"
              image="/api/placeholder/150/150"
            />
            <TeamMember
              name="Alice Johnson"
              role="Head of Product"
              image="/api/placeholder/150/150"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
