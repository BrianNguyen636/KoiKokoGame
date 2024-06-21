
const ASSET_MANAGER = new AssetManager();
const gameEngine = new GameEngine();
const inputManager = new InputManager();

ASSET_MANAGER.queueDownload("./assets/StartScreen.png")
ASSET_MANAGER.queueDownload("./assets/Health.png")
ASSET_MANAGER.queueDownload("./assets/KokoroSprites.png")
ASSET_MANAGER.queueDownload("./assets/KokoroSpritesFlip.png")
ASSET_MANAGER.queueDownload("./assets/KokoroEffects.png")
ASSET_MANAGER.queueDownload("./assets/KokoroPortraits.png")
ASSET_MANAGER.queueDownload("./assets/KokoroGhost.png")
ASSET_MANAGER.queueDownload("./assets/KoishiSprites.png")
ASSET_MANAGER.queueDownload("./assets/KoishiSpritesFlip.png")
ASSET_MANAGER.queueDownload("./assets/KoishiProjectiles.png")
ASSET_MANAGER.queueDownload("./assets/KoishiEffects.png")
ASSET_MANAGER.queueDownload("./assets/KoishiPortraits.png")
ASSET_MANAGER.queueDownload("./assets/KoishiCutIn.png")
ASSET_MANAGER.queueDownload("./assets/HitEffects.png")


ASSET_MANAGER.queueDownload("./assets/Stage.png")

let audioFiles = ['attack1', 'enemy_damaged', 'player_damaged','menu_confirm','menu_change_option','pause']
audioFiles.forEach(e => {
	ASSET_MANAGER.queueDownload("./assets/audio/" + e + ".wav");
})

let uiFiles = ['mainmenu','paused','resume','arrow','restart','AltScreen','title',
	'credits','gameover','options','start','dialogue'
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
