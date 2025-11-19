import { FC } from 'react';

interface JoinDiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinDiscordModal: FC<JoinDiscordModalProps> = ({ isOpen, onClose }) => {
  const handleJoinDiscord = () => {
    // Abrir Discord en nueva pestaña
    window.open('https://discord.gg/indies-cl', '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 rounded-2xl overflow-hidden">
      <div className="bg-[#36393f] border border-[#40444b] rounded-xl p-6 max-w-sm mx-4 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold mb-2">
            ¡Únete a indies.cl! 🚀
          </h3>
          <p className="text-sm text-[#b9bbbe]">
            Conecta con otros creators y forma parte de nuestra comunidad.
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-transparent border border-[#40444b] text-[#b9bbbe] rounded-lg hover:bg-[#40444b] transition-colors text-sm"
          >
            Volver
          </button>
          <button 
            onClick={handleJoinDiscord}
            className="flex-1 px-4 py-2 bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg transition-colors text-sm font-medium"
          >
            Unirse
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinDiscordModal;