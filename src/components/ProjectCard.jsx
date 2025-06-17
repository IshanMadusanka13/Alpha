'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, delay: 0.1 } },
  exit: { opacity: 0, y: 40, transition: { duration: 0.3 } },
};

const ProjectCard = ({
  index,
  id,
  image,
  name,
  type,
  status,
}) => {
  const router = useRouter();

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{
        scale: 1.04,
        boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className="bg-[#18181b] rounded-2xl shadow-lg overflow-hidden flex flex-col w-full max-w-md mx-auto cursor-pointer"
      style={{ transition: 'box-shadow 0.3s' }}
      onClick={() => router.push(`/projects/${id}`)}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter') router.push(`/projects/${id}`); }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover"
      />
      <div className="p-6 flex flex-col">
        <h4 className="font-semibold text-xl text-white">{name}</h4>
        <div className="flex gap-3 mt-2">
          <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded">{type}</span>
          <span className={`text-xs px-2 py-1 rounded ${status === 'Completed' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>{status}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
