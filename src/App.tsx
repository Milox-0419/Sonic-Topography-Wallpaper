import { Canvas } from '@react-three/fiber';
import { UI } from './components/UI/UI';
import { MapScene } from './components/AudioVisualizer/MapScene';
import { useState } from 'react';
import { themes } from './lib/themes';
import { engine } from './lib/AudioEngine';
import {useEffect} from 'react';

export default function App() {
  const [theme, setTheme] = useState('nocturnal');
  const t = themes[theme] || themes['nocturnal'];
  // 在 App 组件内部，现有的 useEffect 之后或之前添加
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const musicUrl = params.get('music');
    if (musicUrl) {
      console.log('🎵 从 URL 加载音乐:', musicUrl);
      const decodedUrl = decodeURIComponent(musicUrl);
      engine.loadUrl(decodedUrl);
      setTimeout(() => {
        engine.play();
      }, 500);
    }
  }, []);
  // Convert THREE.Color to css strings
  const bgDark = `#${t.uBaseColor1.getHexString()}`;

  return (
    <div className="relative w-screen h-screen overflow-hidden text-[#94a3b8] font-sans selection:bg-blue-500/30 transition-colors duration-1000" style={{ backgroundColor: bgDark }}>
      <UI theme={theme} onThemeChange={setTheme} />
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [35, 25, 35], fov: 45 }}>
          <MapScene theme={theme} />
        </Canvas>
      </div>
    </div>
  );
}
