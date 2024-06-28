class YComponent extends YObject
{
    constructor(parent, x= 0, y= 0)
    {
        super();
        
        if (parent instanceof YGame_Object == false)
        {
            throw("ERROR: Component ");
        }
    }
}