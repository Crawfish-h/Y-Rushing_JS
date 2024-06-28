class GPhysics_Object extends GImage_Object
{
    constructor(x= 0, y= 0, image= "", tag= "", name= "")
    {
        super(x, y, image, tag, name);
        this.Mass = 100;
    }

    Move_Physics_Check()
    {
        for (let i = 0; i < FUtility.Current_World.Game_Objects.length; i++)
        {
            let obj = FUtility.Current_World.Game_Objects[i];
            if (obj.Block_Move == false)
            {
                continue;
            }

            if (this.Is_Touching_Object(obj) == true)
            {
                return true;
            }
        }

        return false;
    }

    Move_X(move_X, move_Func= ()=>{})
    {
        this.X += move_X;

        if (this.Move_Physics_Check() == true)
        {
            this.X -= move_X; 
        }else
        {
            move_Func();
        }
    }

    Move_Y(move_Y, move_Func= ()=>{})
    {
        this.Y += move_Y;

        if (this.Move_Physics_Check() == true)
        {
            this.Y -= move_Y; 
        }else
        {
            move_Func();
        }
    }
}