import { IGameRedisType, IGameType } from '@Types/GameType'


function _checkLine(line, player1, player2){
    const result1 = line.every(cell => cell === player1 );
    if(result1) return player1;
    const result2 = line.every(cell => cell === player2 );
    if(result2) return player2;

    return false;

};

function getWinner(game: IGameRedisType): IGameType['winner'] | false {
    const { fieldTurns, player1, player2 }  = game;
    
    // horizontal combinations
    const line1H = [fieldTurns.c0, fieldTurns.c1, fieldTurns.c2];
    const line2H = [fieldTurns.c3, fieldTurns.c4, fieldTurns.c5];
    const line3H = [fieldTurns.c6, fieldTurns.c7, fieldTurns.c8];

    // verticalc ombinations
    const line1V = [fieldTurns.c0, fieldTurns.c3, fieldTurns.c6];
    const line2V = [fieldTurns.c1, fieldTurns.c4, fieldTurns.c7];
    const line3V = [fieldTurns.c2, fieldTurns.c5, fieldTurns.c8];

    // diagonal ombinations
    const line1D = [fieldTurns.c0, fieldTurns.c4, fieldTurns.c8];
    const line2D = [fieldTurns.c2, fieldTurns.c4, fieldTurns.c6];


    const result1H = _checkLine(line1H, player1, player2);
    if(result1H) return result1H;

    const result2H = _checkLine(line2H, player1, player2);
    if(result2H) return result2H;

    const result3H = _checkLine(line3H, player1, player2);
    if(result3H) return result3H;

    const result1V = _checkLine(line1V, player1, player2);
    if(result1V) return result1V;

    const result2V = _checkLine(line2V, player1, player2);
    if(result2V) return result2V;

    const result3V = _checkLine(line3V, player1, player2);
    if(result3V) return result3V;

    const result1D = _checkLine(line1D, player1, player2);
    if(result1D) return result1D;

    const result2D = _checkLine(line2D, player1, player2);
    if(result2D) return result2D;

    return false;
}

export {
    getWinner
}