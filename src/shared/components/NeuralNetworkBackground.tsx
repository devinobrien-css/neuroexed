import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Connection {
  source: Node;
  target: Node;
  strength: number;
  active: boolean;
  activationTime: number;
  activationDuration: number;
}

const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 1.2; // Slightly taller to ensure coverage
    };

    window.addEventListener('resize', resize);
    resize();

    // Create nodes (neurons)
    const nodeCount = Math.floor(
      (window.innerWidth * window.innerHeight) / 15000,
    );
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
      });
    }

    // Create connections (synapses)
    const connections: Connection[] = [];
    const connectionDistance = Math.min(canvas.width, canvas.height) * 0.15;

    for (let i = 0; i < nodes.length; i++) {
      const source = nodes[i];

      for (let j = i + 1; j < nodes.length; j++) {
        const target = nodes[j];
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          connections.push({
            source,
            target,
            strength: 1 - distance / connectionDistance,
            active: false,
            activationTime: 0,
            activationDuration: Math.random() * 1000 + 500,
          });
        }
      }
    }

    // Animation
    let lastTime = 0;
    const activationInterval = 300; // ms between neuron activations
    let lastActivation = 0;

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate delta time
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Update nodes position
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Randomly activate connections
      if (timestamp - lastActivation > activationInterval) {
        const randomConnection =
          connections[Math.floor(Math.random() * connections.length)];
        if (randomConnection && !randomConnection.active) {
          randomConnection.active = true;
          randomConnection.activationTime = timestamp;
        }
        lastActivation = timestamp;
      }

      // Draw connections
      connections.forEach((connection) => {
        const {
          source,
          target,
          strength,
          active,
          activationTime,
          activationDuration,
        } = connection;

        // Check if activation should end
        if (active && timestamp - activationTime > activationDuration) {
          connection.active = false;
        }

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        // Calculate opacity based on strength and activation
        let opacity = strength * 0.2;

        // If active, increase opacity based on activation time
        if (active) {
          const progress = (timestamp - activationTime) / activationDuration;
          const pulse = Math.sin(progress * Math.PI) * 0.8;
          opacity = Math.min(1, strength * 0.2 + pulse);
        }

        const gradient = ctx.createLinearGradient(
          source.x,
          source.y,
          target.x,
          target.y,
        );

        if (active) {
          // Active connection - glowing effect
          gradient.addColorStop(0, `rgba(10, 186, 181, ${opacity})`); // tiffany-blue
          gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 1.2})`); // blue-500
          gradient.addColorStop(1, `rgba(10, 186, 181, ${opacity})`); // tiffany-blue
        } else {
          // Inactive connection
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = active ? 1.5 : 0.5;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

        const connectedActive = connections.some(
          (c) => (c.source === node || c.target === node) && c.active,
        );

        if (connectedActive) {
          ctx.fillStyle = 'rgba(10, 186, 181, 0.8)'; // tiffany-blue
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        }

        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default NeuralNetworkBackground;
