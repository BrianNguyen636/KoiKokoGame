const gameEngine = new GameEngine();
const inputManager = new InputManager();
const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./assets/KokoroSprites.png")
ASSET_MANAGER.queueDownload("./assets/KokoroSpritesFlip.png")
ASSET_MANAGER.queueDownload("./assets/KokoroEffects.png")
ASSET_MANAGER.queueDownload("./assets/Kokoro2Sprites.png")
ASSET_MANAGER.queueDownload("./assets/Kokoro2SpritesFlip.png")
ASSET_MANAGER.queueDownload("./assets/KoishiSprites.png")
ASSET_MANAGER.queueDownload("./assets/KoishiSpritesFlip.png")

ASSET_MANAGER.queueDownload("./assets/Stage.png")


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	const player = new Player(gameEngine);
	inputManager.setCtx(ctx);
	gameEngine.init(ctx, player);
	gameEngine.start();
});
