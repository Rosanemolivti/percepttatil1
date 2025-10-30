import React, { useState, useEffect, createContext, useContext } from 'react';
import { Moon, Sun } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

// Preset Patterns Data
const presetPatterns = [
  {
    id: 0,
    name: "Padrão 1. Movimento Direita",
    description: "Vibração para movimento à direita",
    type: "movement_right",
    actuators: [
      { id: 2, duration: 100, pause: -1 },
      { id: 1, duration: 400, pause: -1 },
    ],
  },
  {
    id: 1,
    name: "Padrão 2. Movimento Esquerda",
    description: "Vibração para movimento à esquerda",
    type: "movement_left",
    actuators: [
      { id: 1, duration: 100, pause: -1 },
      { id: 2, duration: 400, pause: -1 },
    ],
  },
  {
    id: 2,
    name: "Padrão 3. Bidirecional Simples",
    description: "Vibração bidirecional",
    type: "bidirectional",
    actuators: [
      { id: 0, duration: 100, pause: -1 },
      { id: 5, duration: 100, pause: -1 },
    ],
  },
  {
    id: 3,
    name: "Padrão 4. Perigo Complexo",
    description: "Vibração de alerta complexo",
    type: "danger",
    actuators: [
      { id: 2, duration: 150, pause: -1 },
      { id: 1, duration: 150, pause: -1 },
      { id: 3, duration: 150, pause: -1 },
    ],
  },
  {
    id: 4,
    name: "Padrão 5. Estático Direita",
    description: "Vibração estática à direita",
    type: "static_right",
    actuators: [
      { id: 3, duration: 200, pause: -1 },
      { id: 4, duration: 200, pause: -1 },
    ],
  },
  {
    id: 5,
    name: "Padrão 6. Estático Esquerda",
    description: "Vibração estática à esquerda",
    type: "static_left",
    actuators: [
      { id: 0, duration: 200, pause: -1 },
      { id: 1, duration: 200, pause: -1 },
    ],
  },
];

// Home Screen
const Home = ({ setCurrentScreen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">PerceptTátil</h1>
          <div className="flex gap-2 items-center">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border-2 transition-all ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}
              aria-label="Mudar tema"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setCurrentScreen('help')}
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${theme === 'dark' ? 'bg-orange-500' : 'bg-orange-500'}`}
              aria-label="Ajuda"
            >
              ?
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col justify-center items-center">
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => setCurrentScreen('patterns')}
            className={`w-full px-6 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Padrões Fixos e Customizados
          </button>

          <button
            onClick={() => setCurrentScreen('configure')}
            className={`w-full px-6 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Criar Padrão
          </button>

          <button
            onClick={() => setCurrentScreen('tutorial')}
            className={`w-full px-6 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Tutorial
          </button>

          <button
            onClick={() => setCurrentScreen('help')}
            className={`w-full px-6 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Ajuda
          </button>

          <button
            onClick={() => setCurrentScreen('settings')}
            className={`w-full px-6 py-4 rounded-full font-bold text-lg border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Recursos de Acessibilidade
          </button>
        </div>
      </main>

      <footer className={`py-3 px-4 border-t-4 text-center text-xs ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <p>Aplicativo de Controle de Padrões de Vibração - Acessível para Pessoas com Deficiência Visual</p>
      </footer>
    </div>
  );
};

// Patterns List Screen
const VibrationPatterns = ({ setCurrentScreen, customPatterns, setCustomPatterns }) => {
  const { theme, toggleTheme } = useTheme();

  const handleDeletePattern = (id) => {
    if (window.confirm('Tem certeza que deseja deletar este padrão?')) {
      setCustomPatterns(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Padrões de Vibração</h1>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setCurrentScreen('help')}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-orange-500"
            >
              ?
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-3">
          <div>
            <h2 className="text-lg font-bold mb-2">Padrões Pré-configurados</h2>
            <p className="text-xs opacity-75 mb-2">Padrões do sistema (não podem ser editados)</p>
            <div className="space-y-2">
              {presetPatterns.map((pattern) => (
                <div key={pattern.id} className={`p-3 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
                  <h3 className="font-bold text-sm mb-1">{pattern.name}</h3>
                  <p className="text-xs mb-2 opacity-75">{pattern.description}</p>
                  
                  <div className={`text-xs mb-2 p-2 rounded ${theme === 'dark' ? 'bg-yellow-400 text-black' : 'bg-orange-400'}`}>
                    <p className="font-semibold mb-1">Configuração:</p>
                    {pattern.actuators.map((actuator, idx) => (
                      <p key={idx}>
                        Atuador {actuator.id}: {actuator.duration}ms
                      </p>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentScreen({ type: 'view', pattern })}
                    className={`w-full px-3 py-2 rounded-full font-bold border-2 text-xs transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
                  >
                    Visualizar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Padrões Customizados</h2>
            <p className="text-xs opacity-75 mb-2">Padrões criados por você (podem ser editados)</p>
            {customPatterns.length > 0 ? (
              <div className="space-y-2">
                {customPatterns.map((pattern) => (
                  <div key={pattern.id} className={`p-3 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
                    <h3 className="font-bold text-sm mb-1">{pattern.name}</h3>
                    <p className="text-xs mb-2 opacity-75">{pattern.description}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentScreen({ type: 'preview', pattern })}
                        className={`flex-1 px-3 py-2 rounded-full font-bold border-2 text-xs transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
                      >
                        Selecionar
                      </button>
                      <button
                        onClick={() => handleDeletePattern(pattern.id)}
                        className="px-3 py-2 rounded-full font-bold border-2 text-xs transition-all hover:scale-105 bg-red-600 text-white border-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 opacity-75">Nenhum padrão customizado criado ainda</p>
            )}
          </div>
        </div>
      </main>

      <footer className={`p-4 border-t-4 space-y-2 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <button
          onClick={() => setCurrentScreen('configure')}
          className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-orange-500 border-yellow-400' : 'bg-orange-500 border-black'}`}
        >
          ➕ Criar Novo Padrão
        </button>
        <button
          onClick={() => setCurrentScreen('home')}
          className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
        >
          Voltar para o Início
        </button>
      </footer>
    </div>
  );
};

// Pattern Configuration Screen
const PatternConfiguration = ({ setCurrentScreen, customPatterns, setCustomPatterns }) => {
  const { theme, toggleTheme } = useTheme();
  const [patternName, setPatternName] = useState('');
  const [actuators, setActuators] = useState([
    { id: 1, duration: 100, pause: 100 },
    { id: 2, duration: 100, pause: 100 },
  ]);

  const handleAddActuator = () => {
    setActuators([...actuators, { id: actuators.length + 1, duration: 100, pause: 100 }]);
  };

  const handleRemoveActuator = (id) => {
    if (actuators.length > 1) {
      setActuators(actuators.filter(a => a.id !== id));
    }
  };

  const handleUpdateActuator = (id, field, value) => {
    setActuators(actuators.map(a => a.id === id ? { ...a, [field]: parseInt(value) } : a));
  };

  const handleSavePattern = () => {
    if (!patternName.trim()) {
      alert('Por favor, insira um nome para o padrão');
      return;
    }

    const newPattern = {
      id: Date.now(),
      name: patternName,
      description: 'Padrão customizado',
      type: 'custom',
      actuators: actuators,
    };

    setCustomPatterns(prev => [...prev, newPattern]);
    alert(`Padrão "${patternName}" salvo com sucesso!`);
    setCurrentScreen('patterns');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Criar Padrão</h1>
          <div className="flex gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setCurrentScreen('help')} className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-orange-500">?</button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-4">
          <div>
            <label className="block font-semibold mb-2">Nome do Padrão:</label>
            <input
              type="text"
              value={patternName}
              onChange={(e) => setPatternName(e.target.value)}
              placeholder="Ex: Obstáculo à frente"
              className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white text-black"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">Atuadores</h2>
            <div className="space-y-3">
              {actuators.map((actuator) => (
                <div key={actuator.id} className={`p-3 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-semibold">Atuador {actuator.id}</label>
                    {actuators.length > 1 && (
                      <button onClick={() => handleRemoveActuator(actuator.id)} className="text-lg font-bold text-red-600">✕</button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm">Duração (ms):</label>
                      <input
                        type="number"
                        value={actuator.duration}
                        onChange={(e) => handleUpdateActuator(actuator.id, 'duration', e.target.value)}
                        className="w-full px-2 py-1 rounded border-2 border-black bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="text-sm">Pausa (ms):</label>
                      <input
                        type="number"
                        value={actuator.pause}
                        onChange={(e) => handleUpdateActuator(actuator.id, 'pause', e.target.value)}
                        className="w-full px-2 py-1 rounded border-2 border-black bg-white text-black"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddActuator}
              className={`w-full px-4 py-3 rounded-full font-bold border-2 mt-4 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
            >
              + Adicionar Passo
            </button>
          </div>
        </div>
      </main>

      <footer className={`p-4 border-t-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={handleSavePattern}
            className={`flex-1 px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Salvar Padrão
          </button>
          <button
            onClick={() => setCurrentScreen('patterns')}
            className={`flex-1 px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-orange-500 border-yellow-400' : 'bg-orange-500 border-black'}`}
          >
            Voltar
          </button>
        </div>
      </footer>
    </div>
  );
};

// Pattern View Screen
const PatternView = ({ setCurrentScreen, pattern }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    if ('vibrate' in navigator) {
      const vibrationPattern = pattern.actuators.flatMap(a => [a.duration, a.pause > 0 ? a.pause : 50]);
      navigator.vibrate(vibrationPattern);
    }
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Visualizar Padrão</h1>
          <div className="flex gap-2">
            <button onClick={toggleTheme} className={`p-2 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-4">
          <div className={`p-3 rounded-lg border-2 ${theme === 'dark' ? 'bg-orange-500 text-black border-yellow-400' : 'bg-orange-500 border-black'}`}>
            <p className="font-bold text-sm">ℹ️ Padrão Pré-configurado</p>
            <p className="text-xs mt-1">Este é um padrão do sistema e não pode ser alterado.</p>
          </div>

          <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
            <h2 className="text-lg font-bold mb-3">{pattern.name}</h2>
            <div className="space-y-2">
              <div>
                <label className="font-semibold">Descrição:</label>
                <p className="text-sm opacity-75">{pattern.description}</p>
              </div>
              <div>
                <label className="font-semibold">Tipo:</label>
                <p className="text-sm opacity-75">{pattern.type}</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
            <h3 className="text-lg font-bold mb-3">Atuadores</h3>
            <div className="space-y-3">
              {pattern.actuators.map((actuator, idx) => (
                <div key={idx} className={`p-3 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400' : 'border-black'}`}>
                  <label className="font-semibold block mb-2">Atuador {actuator.id}</label>
                  <p className="text-sm">Duração: {actuator.duration}ms</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={`p-4 border-t-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex gap-3 max-w-md mx-auto flex-col">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 disabled:opacity-50 ${theme === 'dark' ? 'bg-orange-500 border-yellow-400' : 'bg-orange-500 border-black'}`}
          >
            {isSimulating ? 'Simulando...' : '📳 Simular Vibração'}
          </button>
          <button
            onClick={() => setCurrentScreen('patterns')}
            className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Voltar
          </button>
        </div>
      </footer>
    </div>
  );
};

// Help Screen
const Help = ({ setCurrentScreen }) => {
  const { theme, toggleTheme } = useTheme();

  const helpSections = [
    {
      title: "O que é este aplicativo?",
      content: "Este é um aplicativo de controle de padrões de vibração para um bracelete vestível. Ele permite que pessoas com deficiência visual recebam informações através de padrões vibracionais.",
    },
    {
      title: "Como usar o aplicativo?",
      content: "1. Conecte o bracelete nas Configurações\n2. Escolha um padrão de vibração pré-configurado\n3. Ou crie seu próprio padrão personalizado\n4. Teste o padrão no seu bracelete",
    },
    {
      title: "Padrões de vibração",
      content: "Cada padrão representa uma situação diferente:\n- Movimento Direita: Obstáculo à direita\n- Movimento Esquerda: Obstáculo à esquerda\n- Bidirecional: Obstáculos em ambos os lados\n- Perigo Complexo: Alerta de perigo",
    },
    {
      title: "Recursos de acessibilidade",
      content: "O aplicativo oferece:\n- Tema escuro para pessoas com baixa visão\n- Tamanho de fonte ajustável\n- Alto contraste\n- Navegação por teclado\n- Compatibilidade com leitores de tela",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ajuda</h1>
          <button onClick={toggleTheme} className={`p-2 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-4">
          {helpSections.map((section, index) => (
            <div key={index} className={`p-4 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
              <h2 className="text-lg font-bold mb-2">{section.title}</h2>
              <p className="text-sm whitespace-pre-wrap opacity-90">{section.content}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={`p-4 border-t-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <button
          onClick={() => setCurrentScreen('home')}
          className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
        >
          Voltar para o Início
        </button>
      </footer>
    </div>
  );
};

// Settings Screen
const Settings = ({ setCurrentScreen, settings, setSettings }) => {
  const { theme, toggleTheme } = useTheme();

  const handleSaveSettings = () => {
    alert('Configurações salvas com sucesso!');
    setCurrentScreen('home');
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Configurações</h1>
          <button onClick={toggleTheme} className={`p-2 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-4">
          <div className={`p-4 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
            <h2 className="text-xl font-bold mb-4">Recursos de Acessibilidade</h2>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Tamanho da Fonte:</label>
              <select
                value={settings.fontSize}
                onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border-2 border-black bg-white text-black"
              >
                <option value="small">Pequeno</option>
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
                <option value="xlarge">Muito Grande</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => setSettings({ ...settings, highContrast: e.target.checked })}
                  className="w-6 h-6 cursor-pointer"
                />
                <span className="font-semibold">Alto Contraste</span>
              </label>
              <p className="text-sm opacity-75 mt-1">Aumenta o contraste das cores</p>
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.vibrationFeedback}
                  onChange={(e) => setSettings({ ...settings, vibrationFeedback: e.target.checked })}
                  className="w-6 h-6 cursor-pointer"
                />
                <span className="font-semibold">Feedback Háptico</span>
              </label>
              <p className="text-sm opacity-75 mt-1">Ativa vibração ao interagir</p>
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Tema:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => theme === 'dark' && toggleTheme()}
                  className={`flex-1 px-4 py-2 rounded-full border-2 flex items-center justify-center gap-2 font-semibold ${
                    theme === 'light' ? 'bg-orange-500 border-black' : 'bg-yellow-400 text-black border-yellow-400'
                  }`}
                >
                  <Sun size={16} /> Claro
                </button>
                <button
                  onClick={() => theme === 'light' && toggleTheme()}
                  className={`flex-1 px-4 py-2 rounded-full border-2 flex items-center justify-center gap-2 font-semibold ${
                    theme === 'dark' ? 'bg-orange-500 border-yellow-400' : 'bg-yellow-400 text-black border-black'
                  }`}
                >
                  <Moon size={16} /> Escuro
                </button>
              </div>
              <p className="text-sm opacity-75 mt-2">Tema escuro recomendado para baixa visão</p>
            </div>
          </div>

          <div className={`p-4 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
            <h2 className="text-xl font-bold mb-4">Conexão do Dispositivo</h2>
            <button
              className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
            >
              Conectar ao Bracelete
            </button>
            <p className="text-sm opacity-75 mt-2">Status: Desconectado</p>
          </div>
        </div>
      </main>

      <footer className={`p-4 border-t-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex gap-3 max-w-md mx-auto">
          <button
            onClick={handleSaveSettings}
            className={`flex-1 px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
          >
            Salvar
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className={`flex-1 px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-orange-500 border-yellow-400' : 'bg-orange-500 border-black'}`}
          >
            Voltar
          </button>
        </div>
      </footer>
    </div>
  );
};

// Tutorial Screen
const Tutorial = ({ setCurrentScreen }) => {
  const { theme, toggleTheme } = useTheme();
  const [currentTopic, setCurrentTopic] = useState('intro');

  const tutorialTopics = {
    intro: {
      title: "O que é este aplicativo?",
      content: "Este é um aplicativo de controle de padrões de vibração para um bracelete vestível. Ele foi desenvolvido em um projeto acadêmico de mobilidade para possibilitar que pessoas com deficiência visual tenham autonomia enquanto caminham.\n\nO aplicativo permite que você:\n• Conecte ao bracelete vestível\n• Escolha padrões de vibração pré-configurados\n• Crie seus próprios padrões personalizados\n• Teste os padrões antes de usar\n\nO bracelete possui 6 motores de vibração dispostos em diferentes posições, permitindo comunicação tátil com o ambiente.",
    },
    "como-usar": {
      title: "Como usar o aplicativo?",
      content: "Siga estes passos para usar o aplicativo:\n\n1. Conecte o bracelete nas Configurações\n   • Acesse \"Recursos de Acessibilidade\"\n   • Clique em \"Conectar ao Bracelete\"\n\n2. Escolha um padrão de vibração\n   • Clique em \"Padrões Fixos e Customizados\"\n   • Selecione um padrão pré-configurado\n\n3. Teste o padrão\n   • Clique em \"Simular Vibração\" para testar no celular\n   • Clique em \"Enviar para Bracelete\" para enviar ao dispositivo\n\n4. Crie seu próprio padrão (opcional)\n   • Clique em \"Criar Padrão\"\n   • Configure os atuadores e durações\n   • Salve o padrão",
    },
    padroes: {
      title: "Padrões de vibração",
      content: "Cada padrão representa uma situação diferente no ambiente:\n\nPadrão 1 - Movimento Direita: Vibração para movimento à direita\nPadrão 2 - Movimento Esquerda: Vibração para movimento à esquerda\nPadrão 3 - Bidirecional Simples: Obstáculos em ambos os lados\nPadrão 4 - Perigo Complexo: Alerta de perigo\nPadrão 5 - Estático Direita: Vibração estática à direita\nPadrão 6 - Estático Esquerda: Vibração estática à esquerda\n\nPadrões Customizados (7+):\nVocê pode criar seus próprios padrões para situações específicas. Os padrões customizados podem ser editados e deletados a qualquer momento.",
    },
    acessibilidade: {
      title: "Recursos de acessibilidade",
      content: "O aplicativo oferece diversos recursos para garantir acessibilidade:\n\n• Tema escuro para pessoas com baixa visão\n• Alto contraste (amarelo sobre preto)\n• Tamanho de fonte ajustável\n• Navegação por teclado\n• Compatibilidade com leitores de tela\n• Espaçamento de texto aumentado (1.5x)\n• Fonte sem serifa para melhor legibilidade\n• Affordances visuais claras\n\nTodos esses recursos seguem as diretrizes WCAG 2.1 para garantir uma experiência acessível para pessoas com diferentes graus de deficiência visual.",
    },
    contato: {
      title: "Precisa de mais ajuda?",
      content: "Se você tiver dúvidas ou sugestões sobre o aplicativo:\n\n• Consulte a seção de Ajuda em cada tela (ícone ?)\n• Revise este tutorial\n• Entre em contato com a equipe de desenvolvimento\n\nEste é um projeto acadêmico desenvolvido com foco em acessibilidade e usabilidade para pessoas com deficiência visual.\n\nObrigado por usar nosso aplicativo!",
    },
  };

  const topicList = [
    { id: "intro", label: "O que é?" },
    { id: "como-usar", label: "Como usar" },
    { id: "padroes", label: "Padrões" },
    { id: "acessibilidade", label: "Acessibilidade" },
    { id: "contato", label: "Contato" },
  ];

  const currentContent = tutorialTopics[currentTopic];
  const currentIndex = topicList.findIndex(t => t.id === currentTopic);

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'}`}>
      <header className={`p-4 border-b-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tutorial</h1>
          <button onClick={toggleTheme} className={`p-2 rounded-full border-2 ${theme === 'dark' ? 'border-yellow-400 bg-orange-500' : 'border-black bg-orange-500'}`}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="max-w-md mx-auto w-full space-y-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {topicList.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setCurrentTopic(topic.id)}
                className={`px-3 py-2 rounded-full font-bold border-2 text-xs transition-all ${
                  currentTopic === topic.id ? 'scale-105' : 'opacity-75 hover:opacity-100'
                } ${
                  currentTopic === topic.id
                    ? theme === 'dark' ? 'bg-orange-500 border-yellow-400' : 'bg-orange-500 border-black'
                    : theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          <div className={`p-4 border-2 rounded-lg ${theme === 'dark' ? 'border-yellow-400 bg-gray-900' : 'border-black bg-yellow-300'}`}>
            <h2 className="text-lg font-bold mb-3">{currentContent.title}</h2>
            <div className="text-sm whitespace-pre-wrap leading-relaxed opacity-90">
              {currentContent.content}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => currentIndex > 0 && setCurrentTopic(topicList[currentIndex - 1].id)}
              disabled={currentIndex === 0}
              className={`flex-1 px-3 py-2 rounded-full font-bold border-2 text-xs transition-all hover:scale-105 disabled:opacity-50 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
            >
              ← Anterior
            </button>
            <button
              onClick={() => currentIndex < topicList.length - 1 && setCurrentTopic(topicList[currentIndex + 1].id)}
              disabled={currentIndex === topicList.length - 1}
              className={`flex-1 px-3 py-2 rounded-full font-bold border-2 text-xs transition-all hover:scale-105 disabled:opacity-50 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
            >
              Próximo →
            </button>
          </div>
        </div>
      </main>

      <footer className={`p-4 border-t-4 ${theme === 'dark' ? 'bg-black border-yellow-400' : 'bg-yellow-400 border-black'}`}>
        <button
          onClick={() => setCurrentScreen('home')}
          className={`w-full px-4 py-3 rounded-full font-bold border-2 transition-all hover:scale-105 ${theme === 'dark' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-yellow-400 text-black border-black'}`}
        >
          Voltar para o Início
        </button>
      </footer>
    </div>
  );
};

// Main App Component
function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [customPatterns, setCustomPatterns] = useState(() => {
    const saved = localStorage.getItem('customPatterns');
    return saved ? JSON.parse(saved) : [];
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      fontSize: 'normal',
      highContrast: false,
      vibrationFeedback: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('customPatterns', JSON.stringify(customPatterns));
  }, [customPatterns]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const renderScreen = () => {
    if (typeof currentScreen === 'object') {
      if (currentScreen.type === 'view') {
        return <PatternView setCurrentScreen={setCurrentScreen} pattern={currentScreen.pattern} />;
      }
      if (currentScreen.type === 'preview') {
        return <PatternView setCurrentScreen={setCurrentScreen} pattern={currentScreen.pattern} />;
      }
    }

    switch (currentScreen) {
      case 'home':
        return <Home setCurrentScreen={setCurrentScreen} />;
      case 'patterns':
        return <VibrationPatterns setCurrentScreen={setCurrentScreen} customPatterns={customPatterns} setCustomPatterns={setCustomPatterns} />;
      case 'configure':
        return <PatternConfiguration setCurrentScreen={setCurrentScreen} customPatterns={customPatterns} setCustomPatterns={setCustomPatterns} />;
      case 'help':
        return <Help setCurrentScreen={setCurrentScreen} />;
      case 'settings':
        return <Settings setCurrentScreen={setCurrentScreen} settings={settings} setSettings={setSettings} />;
      case 'tutorial':
        return <Tutorial setCurrentScreen={setCurrentScreen} />;
      default:
        return <Home setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <ThemeProvider>
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {renderScreen()}
      </div>
    </ThemeProvider>
  );
}

export default App;