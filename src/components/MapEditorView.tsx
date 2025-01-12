import React, { useEffect } from 'react';
import {Box, Button} from "@mui/material";
import {gameEngine} from "../App";
import {loadAllTextures} from "../utils";
import {initDevtools} from "@pixi/devtools";

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
    useEffect( () => {
        loadAllTextures().then((textureList)=>{
            gameEngine.initGameCanvas().then(() => {
                document.getElementById('gameCanvas')?.appendChild(gameEngine.mainApp.canvas);

                initDevtools({
                    app: gameEngine.mainApp,
                });

                (window as any)['__PIXI_APP__'] = gameEngine.mainApp.stage;
            })
        })
    }, []);

    return (
        <Box sx={pageStyle}>
            <Box display={'flex'} flexDirection={'row'} gap={'1em'} alignItems={'center'}>
                <Box>
                    <Button onClick={()=> {
                        console.log(gameEngine)
                    }} variant={'contained'}>LOG ALL</Button>

                    <Button onClick={()=> {
                        gameEngine.pauseGame();
                    }} variant={'contained'}>Pause</Button>

                    <Button onClick={()=> {
                        // gameEngine.showLevelGui();
                    }} variant={'contained'}>Show Skill GUI</Button>

                    <Button onClick={()=> {
                        // gameEngine.showLevelGui();
                    }} variant={'contained'}>Refresh Skills</Button>
                </Box>
            </Box>
            <div id='gameCanvas'/>
        </Box>
    );
}
