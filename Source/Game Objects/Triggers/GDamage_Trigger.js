class GDamage_Trigger extends GTrigger_Base
{
    constructor(x= 0, y= 0, parent, trigger_Distance= 20, trigger_List= [FUtility.Object_Tags.Utility], tag= "", name= "")
    {
        super(x, y, parent, trigger_Distance, trigger_List, tag, name);
        this.Trigger_Effects = this.Trigger_Damage();
        this.On_Overlap();
    }

    Trigger_Damage(other_Object)
    {

    }
}