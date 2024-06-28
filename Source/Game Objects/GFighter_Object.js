class GFighter_Object extends GPhysics_Object
{
    constructor(x= 0, y= 0, health= 100, image= "", tag= "", name= "")
    {
        super(x, y, image, tag, name);
        this.Health = health;
        this.Max_Health = health;
        this.Attack_Damage = 20;
        this.Move_Speed = 4;
        this.Animations.Run = [[0, 0], [1, 0], [2, 0], [3, 0]];
        this.Animations.Damaged = [[5, 0], [3, 0], [5, 0], [3, 0]];
        this.Animations.Attack = [[0, 0], [1, 0], [3, 0], [4, 0], [4, 0], [4, 0]];
        this.Is_Moving = false;
        this.Is_Attacking = false;
        this.Is_Being_Damaged = false;
        this.Image_Offset.X = 5;
        this.Image_Offset.Y = 10;
    }

    Attack()
    {
        if (this.Is_Facing_Right == true)
        {
            
        }else
        {

        }
    }

    Attack_End()
    {
        this.Is_Attacking = false;
        console.log("Attack_End()");
        // Hitbox_List.splice(hitbox_Index, 1); <- pseudo code.
    }
}