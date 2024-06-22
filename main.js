
const ASSET_MANAGER = new AssetManager();
const gameEngine = new GameEngine();
const inputManager = new InputManager();

ASSET_MANAGER.queueDownload("./assets/StartScreen.png")
ASSET_MANAGER.queueDownload("./assets/Health.png")

let files = ['Sprites', 'SpritesFlip','Effects','Portraits'];
files.forEach(e=>{
	ASSET_MANAGER.queueDownload("./assets/Kokoro"+ e +".png")
	ASSET_MANAGER.queueDownload("./assets/Koishi"+ e +".png")
})
ASSET_MANAGER.queueDownload("./assets/KokoroGhost.png")

ASSET_MANAGER.queueDownload("./assets/KoishiCutIn.png")
ASSET_MANAGER.queueDownload("./assets/KoishiProjectiles.png")

ASSET_MANAGER.queueDownload("./assets/HitEffects.png")


ASSET_MANAGER.queueDownload("./assets/Stage.png")
ASSET_MANAGER.queueDownload("./assets/crowd.png")


let audioFiles = ['attack1', 'enemy_damaged', 'player_damaged','menu_confirm','menu_change_option','pause', 'thelostemotion']
audioFiles.forEach(e => {
	ASSET_MANAGER.queueDownload("./assets/audio/" + e + ".wav");
})

let uiFiles = ['mainmenu','paused','resume','arrow','restart','AltScreen','title',
	'credits','gameover','options','start','dialogue', 'star'
];
uiFiles.forEach(e => {
	ASSET_MANAGER.queueDownload("./assets/" + e + ".png");
})



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	inputManager.setCtx(ctx);
	// gameEngine.init(ctx, player);
	// gameEngine.start();
	ctx.drawImage(ASSET_MANAGER.getAsset("./assets/StartScreen.png"), 0, 0);
	gameEngine.startScreen(ctx, player);
});
