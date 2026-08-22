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
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const musicUrl = params.get('music');
    if (musicUrl) {
      // 不要直接调 engine.play()
      // 而是模拟 UI 的加载行为（如设置状态或触发文件选择）
      // 具体做法因项目架构而异，以下是思路示范：
      const decodedUrl = decodeURIComponent(musicUrl);
      // 如果你能找到 UI 组件中的 setCurrentSong 或类似方法
      // 在这里调用它
      // 否则，可能需要通过 ref 触发 UI 组件的文件加载方法
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
