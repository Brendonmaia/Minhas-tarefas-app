import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Pega as tarefas salvas no navegador ao iniciar, se houver
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem('minhas_tarefas');
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });
  
  const [novaTarefa, setNovaTarefa] = useState('');

  // Salva no localStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa(e) {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    setTarefas([...tarefas, { id: Date.now(), texto: novaTarefa, concluida: false }]);
    setNovaTarefa('');
  }

  function alternarConcluida(id) {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }

  function removerTarefa(id) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        padding: '30px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#38bdf8' }}>Minhas Tarefas 🚀</h2>

        <form onSubmit={adicionarTarefa} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="O que você precisa fazer?" 
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #334155',
              backgroundColor: '#0f172a',
              color: '#fff',
              outline: 'none'
            }}
          />
          <button type="submit" style={{
            backgroundColor: '#38bdf8',
            color: '#0f172a',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>Adicionar</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tarefas.length === 0 && (
            <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px' }}>Nenhuma tarefa cadastrada ainda.</p>
          )}

          {tarefas.map(tarefa => (
            <li key={tarefa.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#0f172a',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #334155'
            }}>
              <span 
                onClick={() => alternarConcluida(tarefa.id)}
                style={{
                  cursor: 'pointer',
                  textDecoration: tarefa.concluida ? 'line-through' : 'none',
                  color: tarefa.concluida ? '#64748b' : '#f8fafc',
                  wordBreak: 'break-all',
                  flex: 1,
                  marginRight: '10px'
                }}
              >
                {tarefa.texto}
              </span>
              <button 
                onClick={() => removerTarefa(tarefa.id)} 
                style={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;