import React, {useCallback, useEffect, useRef} from 'react';
import {Box, Button} from "@mui/material";
import {loadAllTextures} from "../utils";
import {initDevtools} from "@pixi/devtools";
import {GameEngine} from "../engine/GameEngine";

const pageStyle = {
    margin: 0,
    padding: 0,
    backgroundColor: '#f5e3e1',
    height: '100vh', width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center',
}

export const GameView = () => {
    const gameEngineRef = useRef<GameEngine | null>(null);

    useEffect( () => {
        gameEngineRef.current  = new GameEngine();

        loadAllTextures().then((textureList)=> {
            if (!gameEngineRef) {
                return;
            }

            const gameInstance = gameEngineRef.current;

            gameInstance?.initGameCanvas().then(() => {
                document.getElementById('gameCanvas')?.appendChild(gameInstance.mainApp.canvas);

                initDevtools({
                    app: gameInstance.mainApp,
                });

                (window as any)['__PIXI_APP__'] = gameInstance.mainApp.stage;
            })
        })
    }, []);

    const pauseGame = useCallback(() => {
        if (!gameEngineRef) {
            return;
        }

        gameEngineRef.current?.pauseGame();

    }, [gameEngineRef]);

    const addLevels = useCallback(() => {
        if (!gameEngineRef) {
            return;
        }

        gameEngineRef.current?.addLevels();

    }, [gameEngineRef]);

    const showGameOverScreen = useCallback(()=> {
        if (!gameEngineRef) {
            return;
        }

        gameEngineRef.current?.showGameOverScreen();
    }, [gameEngineRef])

    const getGameState = useCallback(()=> {
        if (!gameEngineRef) {
            return;
        }

        gameEngineRef.current?.getGameState();
    }, [gameEngineRef])

    return (
        <Box sx={pageStyle}>
            <Box display={'flex'} flexDirection={'row'} gap={'1em'} alignItems={'center'}>
                <Box>
                    <Button onClick={pauseGame} variant={'contained'}>Pause</Button>

                    <Button onClick={addLevels} variant={'contained'}>Add 50 exp</Button>

                    <Button onClick={showGameOverScreen} variant={'contained'}>Go to End</Button>

                    <Button onClick={getGameState} variant={'contained'}>getGameState</Button>
                </Box>
            </Box>
            <div id='gameCanvas'/>
        </Box>
    );
}
