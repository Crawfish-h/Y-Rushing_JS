// Unlike this class's children, this parent class will need to run its On_Overlap function to begin triggering.
class GTrigger_Base extends YGame_Object
{
    //trigger_Distance: the maximum distance this trigger will be activated by a YGame_Object.
    //trigger_List: the types of objects this trigger can be activated by. The type of argument should be an array of string tags.
    constructor(x= 0, y= 0, parent, trigger_Size= { Width: 10, Height: 10 }, trigger_List= [FUtility.Object_Tags.Player], tag= "", name= "")
    {
        super(x, y, tag, name);

        this.Object_Size = trigger_Size;
        this.Trigger_List = trigger_List;
        this.On_Overlap = this.Trigger_Overlap;
        this.Trigger_Effects = (other_Object)=>{};
        this.Parent = parent;
        this.Object_Size.Width = 40;
        this.Object_Size.Height = 40;
        setTimeout(this.Trigger_Overlap.bind(this), 500);
    }

    Destroy()
    {
        FUtility.YObject_Remove_At(FUtility.YObject_List, this);
        FUtility.YObject_Remove_At(FUtility.Current_World.Game_Objects, this);
        this.Parent = null;
        this.X = -10000;
        this.Y = -10000;
    }

    Trigger_Overlap()
    {
        for (let i = 0; i < FUtility.Current_World.Game_Objects.length; i++)
        {
            let obj = FUtility.Current_World.Game_Objects[i];

            if (this.Trigger_List.includes(obj.Tag) == false)
            {
                continue;
            }

            /*if (obj.X < this.X + this.Trigger_Distance && obj.X > this.X - this.Trigger_Distance &&
                obj.Y < this.Y + this.Trigger_Distance && obj.Y > this.Y - this.Trigger_Distance)*/
            if (this.Is_Touching_Object(obj, false) == true)
            {
                obj.On_Overlap(this);
                this.Trigger_Effects(obj);
            }
        }
    }
}