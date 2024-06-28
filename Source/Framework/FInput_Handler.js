class FInput_Handler
{
    static Object_Input_List = [];
    static Key_Map = {};

    // A list of YObjects that do things on a mouse click.
    static Object_Click_List = []; 

    static Add_Event_Listeners()
    {
        document.addEventListener("keydown", e => 
        {
            let ev = e || event;
            FInput_Handler.Key_Map[ev.key] = ev.type == 'keydown';
        });
    
        document.addEventListener("keyup", e =>
        {
            let ev = e || event;
            FInput_Handler.Key_Map[ev.key] = ev.type == 'keydown';
        });

        document.addEventListener("click", e =>
        {
            console.log("Click");
            for (let i = 0; i < FInput_Handler.Object_Click_List.length; i++)
            {
                FInput_Handler.Object_Click_List[i].On_Click();
            }

        }, true);
    }

    static Do_Input(key_Map= {})
    {
        for (let i = 0; i < FInput_Handler.Object_Input_List.length; i++)
        {
            FInput_Handler.Object_Input_List[i].On_Input(key_Map);
        }
    }
}