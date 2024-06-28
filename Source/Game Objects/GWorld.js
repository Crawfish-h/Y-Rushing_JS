class GWorld extends YGame_Object
{
    constructor(x, y, tag, name) 
    {
        super(x, y, tag, name);
        this.Game_Objects = [];
        this.Player = undefined;
    }

    Init()
    {
        let player_X = 50;
        let player_Y = 550;

        let wall_0 = new GWall(player_X, player_Y + 60, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, `Wall`, 50);
        let wall_1 = new GWall(player_X + 60, player_Y + 40, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, `Wall`, 50);

        for (let i = 0; i < 20; i++)
        {
            new GWall(300, 30 * i, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, `Wall_${i}`);
        }

        for (let i = 3; i < 23; i++)
        {
            new GWall(300 + 30 * i, 0, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, `Wall_${i}`);
        }

        /*for (let i = 0; i < 50; i ++)
        {
            new GWall(FUtility.IRandom_Range(300, 300 + wall_0.Image_Size.Width * 30), FUtility.IRandom_Range(wall_0.Image_Size.Height, wall_0.Image_Size.Height * 40), TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, `Wall_${-1}`);
        }*/

        let wall_2 = new GWall(1150 - 350, 330, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, "Wall", 200);
        let wall_3 = new GWall(1150 - 550, 470, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, "Wall", 130);
        let wall_4 = new GWall(1150 - 730, 560, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Wall, "Wall", 80);
        let breakable = new GBreak_Object(60, 200, 100, TResource_Loader.Image_List.Path_Red, FUtility.Object_Tags.Breakable, "Breakable Object", 
            (break_Object)=>{ 
                    let break_Enemy = new GEnemy_Base(60, 200, 100, TResource_Loader.Image_List.Player_Sprites_Left, FUtility.Object_Tags.Enemy, "Enemy");
                    break_Enemy.Move_Speed = 4;
                    break_Object.Destroy(); 
                });

        FUtility.Y_Grid = new YGrid(600, 300, [ {[FUtility.Object_Tags.Concrete_Floor]: 0}, {[FUtility.Object_Tags.Dirt_Floor]: 10} ], 10, 50, 600);
        FUtility.PF_Grid = new PF.Grid(FUtility.Y_Grid.Convert_List());
        FUtility.AStar = new YAStar();

        let camera = new GCamera(-player_X + 0.95 * (FRenderer.Canvas.width / 2), -player_Y + 0.95 * (FRenderer.Canvas.height / 2), FUtility.Object_Tags.Camera, "Camera");
        camera.Set_Zoom(1.5);
        FRenderer.Set_Camera(camera);

        let player = new GPlayer(player_X, player_Y, 100, TResource_Loader.Image_List.Player_Sprites_Left, FUtility.Object_Tags.Player, "Player");
        player.Camera = camera;
        this.Player = player;

        let enemy = new GEnemy_Base(1150, 230, 100, TResource_Loader.Image_List.Player_Sprites_Left, FUtility.Object_Tags.Enemy, "Enemy");
        

        /*for (let i = 0; i < path.length; i++)
        {
            grid_Basic.Node_List[path[i][1]][path[i][0]].Image.Image.src = TResource_Loader.Image_List.Path_Red;
        }
        
        let grid_Basic = new YGrid(600, 300, [ {[FUtility.Object_Tags.Concrete_Floor]: 0}, {[FUtility.Object_Tags.Dirt_Floor]: 10} ], 10, 50, 600);
        let grid = new PF.Grid(grid_Basic.Convert_List());
        enemy.Path_Grid = grid_Basic;
        enemy.Path_Grid = grid;
        let enemy_Node = grid_Basic.Find_XY(enemy)[0];
        let player_Node = grid_Basic.Find_XY(player)[0];
        let finder = new PF.AStarFinder();
        let path = finder.findPath(enemy_Node.Index_X, enemy_Node.Index_Y, player_Node.Index_X, player_Node.Index_Y, grid);
        */

        //this.AStar.Find_Path(grid, enemy, player, true);
    }
}