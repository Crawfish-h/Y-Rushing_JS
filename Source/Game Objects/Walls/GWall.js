class GWall extends GImage_Object
{
    constructor(x= 0, y= 0, image= "", tag= "", name= "", size= 35)
    {
        super(x, y, image, tag, name);
        this.Image_Size.Width = size * 0.9;
        this.Image_Size.Height = size * 0.9;
        this.Object_Size = { Width: size, Height: size };
        this.Block_Move = true;
        //this.Image_Offset.Y = -10;

        //this.Set_Size(100, 100);
    }
}