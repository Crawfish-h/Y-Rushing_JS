class YGame_Object extends YObject
{
    constructor(x= 0, y= 0, tag= "", name= "")
    {
        super(tag, name);

        this.X = x;
        this.Y = y;
        this.Can_Collide = true;
        this.Can_Overlap = true;
        this.Block_Move = false; // If true, then block movement of other YGame_Objects.
        this.Object_Size = { Width: 20, Height: 20 };

        //this.State = [];
        //this.State.push();
        
        this.On_Overlap = (other_Object)=>{};
        this.On_Collsion = (other_Object)=>{};

        if (FUtility.Current_World != undefined)
        {
            FUtility.Current_World.Game_Objects.push(this);
        }
    }

    /**
     * @param {YGame_Object} other_Object The object that we are testing collisions/overlaps with.
     * @param {boolean} use_Offsets Some objects require and offset to touch other objects correctly.
     * @returns Returns true if this is object is touching other_Object.
    */
    Is_Touching_Object(other_Object, use_Offsets= true)
    {
        let x_Offset = 0;
        let y_Offset = 0;

        if (other_Object.Object_Size.Width != FRenderer.Frame_Size)
        {
            x_Offset = -other_Object.Object_Size.Width / 2;
        }

        if (other_Object.Object_Size.Height != FRenderer.Frame_Size)
        {
            y_Offset = -other_Object.Object_Size.Height / 2 + (FRenderer.Frame_Size - other_Object.Object_Size.Height) * 0.25;
        }

        /*if (other_Object.X < this.X + size_W + x_Offset && other_Object.X > this.X - size_W + x_Offset &&
            other_Object.Y < this.Y + size_H + y_Offset && other_Object.Y > this.Y - size_H + y_Offset)*/
        if  (
                other_Object.X + x_Offset < this.X + this.Object_Size.Width &&
                other_Object.X + x_Offset + other_Object.Object_Size.Width > this.X &&
                other_Object.Y + y_Offset < this.Y + this.Object_Size.Height &&
                other_Object.Y + y_Offset + other_Object.Object_Size.Height > this.Y
            )
        {
            return true;
        }else
        {
            return false
        }
    }

    /**
     * @param {number} other_X The x position that we are testing collisions/overlaps with.
     * @param {number} other_X The y position that we are testing collisions/overlaps with.
     * @param {number} other_Size_Width The width size of the position that we are testing collisions/overlaps with.
     * @param {number} other_Size_Height The height size of the position that we are testing collisions/overlaps with.
     * @returns Returns true if this is object is touching other_Object.
    */
    Is_Touching_XY(other_X, other_Y, other_Size_Width, other_Size_Height)
    {
        let x_Offset = 0;
        let y_Offset = 0;

        if (other_Size_Width != FRenderer.Frame_Size)
        {
            x_Offset = -other_Size_Width / 2;
        }

        if (other_Size_Height != FRenderer.Frame_Size)
        {
            y_Offset = -other_Size_Height / 2 + (FRenderer.Frame_Size - other_Size_Height) * 0.25;
        }

        if  (
                other_X + x_Offset < this.X + this.Object_Size.Width &&
                other_X + x_Offset + other_Size_Width > this.X &&
                other_Y + y_Offset < this.Y + this.Object_Size.Height &&
                other_Y + y_Offset + other_Size_Height > this.Y
            )
        {
            return true;
        }else
        {
            return false
        }
    }
}