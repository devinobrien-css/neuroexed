import React, { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const NetworkVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network nodes
    const nodes = [
      { x: 0.5, y: 0.5, size: 8, color: '#3B82F6', label: 'NeuroExed' },
      { x: 0.2, y: 0.3, size: 6, color: '#8B5CF6', label: 'University' },
      { x: 0.8, y: 0.3, size: 6, color: '#06B6D4', label: 'Research Lab' },
      { x: 0.3, y: 0.7, size: 5, color: '#10B981', label: 'NGO' },
      { x: 0.7, y: 0.7, size: 5, color: '#F59E0B', label: 'Tech Company' },
      { x: 0.1, y: 0.6, size: 4, color: '#EF4444', label: 'Hospital' },
      { x: 0.9, y: 0.4, size: 4, color: '#EC4899', label: 'Startup' },
      { x: 0.4, y: 0.2, size: 4, color: '#6366F1', label: 'Foundation' },
      { x: 0.6, y: 0.8, size: 4, color: '#84CC16', label: 'Institute' },
    ];

    // Connection lines
    const connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [1, 2],
      [2, 4],
      [3, 5],
      [4, 6],
      [1, 7],
      [2, 8],
    ];

    let animationFrame = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      // Draw connections
      connections.forEach(([start, end]) => {
        const startNode = nodes[start];
        const endNode = nodes[end];

        const startX = startNode.x * width;
        const startY = startNode.y * height;
        const endX = endNode.x * width;
        const endY = endNode.y * height;

        // Animated line opacity
        const opacity =
          0.3 + 0.2 * Math.sin(animationFrame * 0.02 + start * 0.5);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw data flow particles
        const progress =
          (Math.sin(animationFrame * 0.03 + start * 0.3) + 1) / 2;
        const particleX = startX + (endX - startX) * progress;
        const particleY = startY + (endY - startY) * progress;

        ctx.beginPath();
        ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#3B82F6';
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulseSize =
          node.size + 2 * Math.sin(animationFrame * 0.05 + index * 0.5);

        // Outer glow
        const gradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          pulseSize + 10,
        );
        gradient.addColorStop(0, `${node.color}40`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, pulseSize + 10, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Inner highlight
        ctx.beginPath();
        ctx.arc(x - 2, y - 2, pulseSize * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });

      animationFrame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-transparent to-slate-50/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700">
            <Icon icon="mdi:network" className="mr-2 h-4 w-4" />
            Connected Ecosystem
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Our Partnership Network
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Visualizing the interconnected web of relationships that drive
            innovation and impact across the globe.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50"></div>

          <canvas
            ref={canvasRef}
            className="relative z-10 h-96 w-full"
            style={{ width: '100%', height: '400px' }}
          />

          <div className="absolute inset-x-4 bottom-4 z-20 flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">Universities</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-purple-500"></div>
              <span className="text-gray-600">Research Labs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-teal-500"></div>
              <span className="text-gray-600">NGOs</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Tech Companies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkVisualization;
