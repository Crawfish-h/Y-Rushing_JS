class YGrid_Node extends YGame_Object
{
    constructor(tag, index_X, index_Y, x, y, size)
    {
        super(x, y, tag, "Path Node");

        this.Index_X = index_X;
        this.Index_Y = index_Y;
        this.Size = size;
        this.Object_Size.Width = size;
        this.Object_Size.Height = size;
        this.Image = new GImage_Object(this.X, this.Y, TResource_Loader.Image_List.Wall_Red_Gray, FUtility.Object_Tags.Utility, "Path Image");
        let image_Size = size;
        this.Image.Image_Size.Width = image_Size;
        this.Image.Image_Size.Height = image_Size;
        this.Image.Object_Size.Width = image_Size;
        this.Image.Object_Size.Height = image_Size;

        this.Disable_Node();
    }

    /** If a YGame_Object with its Block_Move set to true is touching this node, destroy this node. */
    Disable_Node()
    {
        for (let i = 0; i < FUtility.Current_World.Game_Objects.length; i++)
        {
            let obj = FUtility.Current_World.Game_Objects[i];
            if (this.Is_Touching_Object(obj) == true)
            {
                if (obj.Block_Move == false)
                {
                    continue;
                }

                console.log("disabled Node");
                this.Is_Active = false;
                this.Image.Destroy();
                //this.Destroy();
                return;
            }
        }
    }
}