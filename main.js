// phina.js をグローバル領域に展開
phina.globalize();

// 定数
const SCREEN_WIDTH = 640; // 画面横サイズ
const SCREEN_HEIGHT = 960; // 画面縦サイズ

const ASSETS = {
    image: {
        pirate:"https://2.bp.blogspot.com/-vic8sGz8fv0/W6XJc9aEH1I/AAAAAAABPDA/zhl2g1Nq2qMRJGflTeOEim_IFdUffz9PwCLcBGAs/s450/kaizoku_man.png",
        barrel:"https://1.bp.blogspot.com/-BtjaBaaAKNw/VkxNbVZhsLI/AAAAAAAA0vs/roxlxfuXIgE/s400/drink_taru.png",
    }
};

// MainScene クラスを定義
phina.define('MainScene', {
    superClass: 'CanvasScene',
    init: function() {
        this.superInit();
        let score = 0;
        let rand = Random.randint(1, 6);
        let barrel_num = 0; // 樽に番号をつける
        // 位置
        let position_x = [150, 450];
        let position_y = [200, 500, 800];
        // 樽グループ
        this.barrelGroup = DisplayElement().addChildTo(this);
        const self = this;
        for(let x of position_x){
            for(let y of position_y){
                barrel_num++;
                // 樽作成
                let barrel = Barrel(barrel_num, x, y).addChildTo(self.barrelGroup);
                barrel.onpointend = function() {
                    this.remove();
                    if(rand == barrel.number){
                        self.invalid();
                        self.popUp(self, x, y);
                        setTimeout(function() {
                            self.exit({
                                score: score,
                                message: "黒ひげ危機一〇髪で触るphina.js",
                                hashtags: "C95_DCRC"
                            });
                        }, 500);
                    }else{
                        score++;
                    }
                };
            }
        }
    },
    // 黒ひげインスタンスを後から作成する
    popUp: function(self, position_x, position_y) {
        Pirate(position_x, position_y).addChildTo(self);
    },
    // 樽それぞれのタッチを無効化
    invalid: function(){
        for (const barrel of this.barrelGroup.children) {
            barrel.setInteractive(false);
        }
    }
});

// 海賊クラスを定義
phina.define('Pirate',{
    superClass: 'Sprite',
    init:function(x, y) {
        this.superInit('pirate',300,300);
        this.setPosition(x, y);
    },
});

// 樽クラスを定義
phina.define('Barrel',{
    superClass: 'Sprite',
    init:function(number, x, y) {
        this.superInit('barrel',200,200);
        this.number = number;
        this.setInteractive(true); // タッチを有効にする
        this.setPosition(x, y);
    },
});

// メイン処理
phina.main(function() {
    // アプリケーション生成
    var app = GameApp({
        title: '黒ひげ危機一〇髪',
        startLabel: location.search.substr(1).toObject().scene || 'title',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        assets: ASSETS,
        backgroundColor: '#191970'
    });
    // アプリケーション実行
    app.run();
});