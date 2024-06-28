class GEnemy_Base extends GFighter_Object
{
    constructor(x= 0, y= 0, health= 100, image= "", tag= "", name= "")
    {
        super(x, y, health, image, tag, name);

        this.On_Overlap = this.Enemy_Overlap;
        this.Object_Size.Width = 30;
        this.Object_Size.Height = 30;
        this.Is_Moving = false;
        this.On_Tick = this.Tick;
        this.Move_Speed = 6;
    }

    Tick()
    {
        if (this.Is_Moving == false)
        {
            this.Is_Moving = true;
            let enemy_Node = FUtility.Y_Grid.Find_XY(this)[0];
            let player_Node = FUtility.Y_Grid.Find_XY(FUtility.Current_World.Player)[0];
            let finder = new PF.AStarFinder();
            let path = finder.findPath(enemy_Node.Index_X, enemy_Node.Index_Y, player_Node.Index_X, player_Node.Index_Y, FUtility.PF_Grid.clone());
            FUtility.AStar.Move_To(FUtility.Y_Grid, this, path, this.Move_Speed, ()=>{ this.Is_Moving = false });
        }
    }

    Enemy_Overlap(other_Object)
    {
        if (this.Can_Overlap == true)
        {
            switch(other_Object.Tag)
            {
                case FUtility.Object_Tags.Damage_Trigger:
                    this.On_Damaged(other_Object.Parent);
                    break;
                default:
                    break;
            }
        }
    }

    On_Damaged(attacker)
    {
        console.log("Enemy Damaged!");
        this.Health -= attacker.Attack_Damage;
        if (this.Health <= 0)
        {
            console.log("Enemy Destroyed!!")
            this.Destroy();
        }
    }
}