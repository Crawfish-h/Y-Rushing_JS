class GCamera extends YGame_Object
{
    #Zoom = 1.0;

    constructor(x, y, tag, name)
    {
        super(x, y, tag, name);
        //this.On_Tick = this.Camera_Tick;
    }

    Get_Zoom()
    {
        return this.#Zoom;
    }

    Set_Zoom(new_Zoom= 1.5)
    {
        this.#Zoom = new_Zoom;
        FRenderer.Game_Container.style.transform = `scale(${this.#Zoom})`;
    }
    
    Camera_Tick()
    {
        if (FUtility.Current_World.Player != undefined)
        {

        }
    }
}