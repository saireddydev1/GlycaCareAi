import React, { useEffect, useRef } from 'react';

export default function MetabolicCursorAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // 1. Double-Helix DNA Strand Geometry Parameters
    const dnaNodes = 46; // Base pair nodes along diagonal Hero helix
    const dnaRadius = 48; // Radius of the helix twist
    const dnaSpacing = 28; // Spacing along helix axis

    // 2. Background Constellation Grid Nodes
    const bgNodeCount = Math.min(60, Math.floor((width * height) / 22000));
    const bgNodes = Array.from({ length: bgNodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2,
      baseRadius: Math.random() * 2 + 1.2,
      color: Math.random() > 0.4 ? '#2dd4bf' : Math.random() > 0.5 ? '#38bdf8' : '#f59e0b',
      alpha: Math.random() * 0.35 + 0.15
    }));

    // 3. Mouse Coordinates & Easing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 200,
      isMoving: false
    };

    let moveTimeout;

    // 4. Foreground Bio-Particle Trail
    const particles = [];
    const maxParticles = 40;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isMoving = true;

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        mouse.isMoving = false;
      }, 300);

      // Spawn Insulin & Enzyme particles
      if (Math.random() < 0.55) {
        const types = [
          { name: 'Insulin', color: '#f59e0b', shadow: '#fbbf24', radius: 4, label: '⚡ Insulin' },
          { name: 'ALT', color: '#38bdf8', shadow: '#0284c7', radius: 3.5, label: '🧪 ALT' },
          { name: 'AST', color: '#2dd4bf', shadow: '#14b8a6', radius: 3, label: '✨ AST' },
          { name: 'Glutathione', color: '#34d399', shadow: '#10b981', radius: 4.5, label: '💎 Detox' }
        ];

        const chosen = types[Math.floor(Math.random() * types.length)];

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2.2,
          vy: (Math.random() - 0.5) * 2.2 - 0.8,
          radius: chosen.radius,
          color: chosen.color,
          shadow: chosen.shadow,
          label: chosen.label,
          life: 1.0,
          decay: 0.02 + Math.random() * 0.02
        });

        if (particles.length > maxParticles) {
          particles.shift();
        }
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Rotation time offset for DNA
    let time = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.025;

      // Mouse position easing
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      // A. Ambient Spotlight Following Cursor
      if (mouse.targetX > 0 && mouse.targetY > 0) {
        const bgGrad = ctx.createRadialGradient(
          mouse.x, mouse.y, 10,
          mouse.x, mouse.y, 380
        );
        bgGrad.addColorStop(0, 'rgba(45, 212, 191, 0.12)');
        bgGrad.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
        bgGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');

        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // B. SINGLE ROTATING 3D DOUBLE-HELIX DNA STRAND (Diagonal Cross in Middle of Hero Section)
      const drawHeroCrossDnaHelix = () => {
        const centerX = width / 2;
        const centerY = Math.min(320, height * 0.35); // Center of Hero section
        const mouseTilt = (mouse.x - width / 2) * 0.0003;

        ctx.save();
        ctx.translate(centerX, centerY);
        // Diagonal cross angle across the Hero section (-25 degrees)
        ctx.rotate(-25 * (Math.PI / 180));

        const totalLength = Math.max(width * 1.2, 1200);

        for (let i = 0; i < dnaNodes; i++) {
          const rawY = ((i * dnaSpacing + time * 18) % totalLength) - totalLength / 2;
          const angle = i * 0.35 + time + mouseTilt;

          // Smooth edge fade at tips so strand blends seamlessly
          const distFromCenter = Math.abs(rawY) / (totalLength / 2);
          const edgeFade = Math.max(0, 1 - Math.pow(distFromCenter, 1.6));
          if (edgeFade <= 0.01) continue;

          // Strand A 3D Coordinates
          const xA = Math.cos(angle) * dnaRadius;
          const zA = Math.sin(angle) * dnaRadius;

          // Strand B 3D Coordinates (180 deg offset)
          const xB = Math.cos(angle + Math.PI) * dnaRadius;
          const zB = Math.sin(angle + Math.PI) * dnaRadius;

          // 3D Perspective Scaling & Opacity
          const scaleA = ((zA + 100) / 100) * 0.5 + 0.5;
          const scaleB = ((zB + 100) / 100) * 0.5 + 0.5;

          const alphaA = Math.max(0.12, ((zA + dnaRadius) / (dnaRadius * 2)) * 0.55) * edgeFade;
          const alphaB = Math.max(0.12, ((zB + dnaRadius) / (dnaRadius * 2)) * 0.55) * edgeFade;

          // Draw Base Pair Hydrogen Bond Rung (Connecting Line)
          ctx.beginPath();
          ctx.moveTo(xA, rawY);
          ctx.lineTo(xB, rawY);
          ctx.strokeStyle = `rgba(52, 211, 153, ${Math.min(alphaA, alphaB) * 0.4})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();

          // Base Pair Nucleotide Nodes
          // Strand A Node (Teal / Emerald)
          ctx.beginPath();
          ctx.arc(xA, rawY, 4.2 * scaleA, 0, Math.PI * 2);
          ctx.fillStyle = zA > 0 ? '#2dd4bf' : '#0d9488';
          ctx.globalAlpha = alphaA;
          ctx.shadowBlur = zA > 0 ? 10 : 0;
          ctx.shadowColor = '#2dd4bf';
          ctx.fill();

          // Strand B Node (Cyan / Amber)
          ctx.beginPath();
          ctx.arc(xB, rawY, 4.2 * scaleB, 0, Math.PI * 2);
          ctx.fillStyle = zB > 0 ? '#38bdf8' : '#f59e0b';
          ctx.globalAlpha = alphaB;
          ctx.shadowBlur = zB > 0 ? 10 : 0;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1.0;
        }

        ctx.restore();
      };

      // Draw Single Diagonal Cross DNA Strand in Middle of Hero Section
      drawHeroCrossDnaHelix();

      // C. Background Constellation Grid
      for (let i = 0; i < bgNodes.length; i++) {
        const node = bgNodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          node.radius = node.baseRadius + force * 3;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(45, 212, 191, ${force * 0.2})`;
          ctx.lineWidth = force * 1.2;
          ctx.stroke();
        } else {
          node.radius = node.baseRadius;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = node.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // D. Custom Bio-Sensor Reticle Cursor
      if (mouse.targetX > 0 && mouse.targetY > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.isMoving ? 20 : 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(45, 212, 191, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
      }

      // E. Bio-Particle Trail
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);

        ctx.shadowBlur = 10;
        ctx.shadowColor = p.shadow;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life > 0.5 && i % 4 === 0) {
          ctx.font = '9px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(p.label, p.x + 8, p.y - 6);
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
