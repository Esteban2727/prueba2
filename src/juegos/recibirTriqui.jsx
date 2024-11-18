import React, { useEffect, useState } from 'react';
import "./styleTriqui.css"
import db from './db.json'
export default  function RecibirTriqui (){
    const [alertMessage, setAlertMessage] = useState("");
    let [message, setMessage] = useState('');
    const [board, setBoard] = useState([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]);
    const [socket, setSocket] = useState(null);
    const [turn, setTurn] = useState('X');
    const [gameMode, setGameMode] = useState('normal');
    const [playerSymbol, setPlayerSymbol] = useState('X');
    const [isSocketReady, setIsSocketReady] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const connectWebSocket = () => {
            const socketInstance = new WebSocket('ws://localhost:5000/ws/triqui/');
            setSocket(socketInstance);
    
            socketInstance.onopen = () => {
                console.log('WebSocket connected');
                setIsSocketReady(true);
                setLoading(false);
                iniciarJuego(socketInstance); // Iniciar el juego cuando se conecta
            };
    
            socketInstance.onmessage = (e) => {
                const data = JSON.parse(e.data);
                if (data.action === 'actualizar_tablero') {
                    setBoard(data.tablero);
                    setTurn(data.turno);
                } else if (data.action === 'fin_juego') {
                    setBoard(data.tablero);
                    alert(data.mensaje);
                } else if (data.action === 'juego_iniciado') {
                    setBoard(data.tablero);
                    setTurn(data.turno);
                }
            };
    
            socketInstance.onclose = () => {
                console.log('WebSocket disconnected. Attempting to reconnect...');
                setTimeout(connectWebSocket, 2000);
            };
            const interval= setInterval(()=>{
                const frases= db.frases
                const inx = Math.floor(Math.random()* frases.length)
                setMessage(frases[inx])
                },2000)
            
               
            return () => {
                socketInstance.close();
                clearInterval(interval)
            };
            
        };
    
        connectWebSocket();
    }, []);

    const iniciarJuego = (socketInstance) => {
        if (socketInstance && socketInstance.readyState === WebSocket.OPEN) {
            socketInstance.send(JSON.stringify({
                action: 'iniciar_juego',
                modoNormal: gameMode === 'normal',
                figuraJugador1: playerSymbol,
                juegaPrimero: true
            }));
        }
    };

    const makeMove = (row, col) => {
        if (board[row][col] === " ") {
            const letra = col === 0 ? 'a' : col === 1 ? 'b' : 'c';
            const casilla = `${letra}${row + 1}`;

            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({
                    action: 'hacer_jugada',
                    casilla: casilla,
                    jugador: turn
                }));
            } else {
                setAlertMessage("Conexión de WebSocket no disponible. Intenta reconectar.");
            }
        } else {
            setAlertMessage("Celda ocupada. Elige otra.");
        }
    };

    const handleModeChange = (mode) => {
        setGameMode(mode);
        resetGame(); // Reinicia el juego al cambiar el modo
    };

    const handleSymbolChange = (symbol) => {
        setPlayerSymbol(symbol);
        resetGame(); // Reinicia el juego al cambiar el símbolo
    };

    const resetGame = () => {
        setBoard([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]);
        setTurn(playerSymbol); // Mantiene el símbolo del jugador
        if (socket && socket.readyState === WebSocket.OPEN) {
            iniciarJuego(socket); // Reinicia el juego en el servidor
        }
    };
    const closeAlert = () => setAlertMessage("");

    return (
        
        <div className='first_container'>
            

<div className="title1">
<p>{message}</p>

</div>
            <h1 className='titulo'>Juego de Triqui</h1>
            <div className='opciones'>

                
                <button classname= "modo" onClick={() => handleModeChange('normal')}>Modo Normal</button>
                <button onClick={() => handleModeChange('especial')}>Modo Especial</button>
                <button onClick={() => handleSymbolChange('X')}>Jugar como X</button>
                <button onClick={() => handleSymbolChange('O')}>Jugar como O</button>
            </div>
            <div className='juego'>Turno actual: {turn}</div>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div>
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map(( cell, colIndex) => (
                                <div className='tablero'
                                    key={colIndex} 
                                    onClick={() => makeMove(rowIndex, colIndex)} 
>
                                    {cell}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

