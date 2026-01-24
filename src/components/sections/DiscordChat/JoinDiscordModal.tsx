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
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-2xl bg-black/50 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 mx-4 max-w-sm rounded-xl border border-[#40444b] bg-[#36393f] p-6 text-white shadow-2xl duration-200">
        <div className="mb-4 text-center">
          <h3 className="mb-2 text-lg font-bold">¡Únete a indies.cl! 🚀</h3>
          <p className="text-sm text-[#b9bbbe]">
            Conecta con otros creators y forma parte de nuestra comunidad.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-[#40444b] bg-transparent px-4 py-2 text-sm text-[#b9bbbe] transition-colors hover:bg-[#40444b]"
          >
            Volver
          </button>
          <button
            onClick={handleJoinDiscord}
            className="flex-1 rounded-lg bg-[#5865f2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4752c4]"
          >
            Unirse
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinDiscordModal;
