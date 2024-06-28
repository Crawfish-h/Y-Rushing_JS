function Entry_Point()
{
    console.log("Entry_Point");

    FRenderer.Init();
    let world = new GWorld(0, 0, FUtility.Object_Tags.Utility, "World");
    FUtility.Current_World = world;
    world.Init();

    FInput_Handler.Add_Event_Listeners();

    Game_Loop(world);
}

function Game_Loop(world= new GWorld())
{   
    let func = () =>
    {
        FUtility.Test_Number++;
        console.log("Test_Number: " + FUtility.Test_Number);

        if (FUtility.Test_Number > 299)
        {
            return true;
        }

        return false;
    }

    //FUtility.Repeat_Until(func, {condition: false});

    let fps = 60;
    let start = Date.now();
    let frame_Duration = 1 / fps;
    let lag = 0;

    const step = () =>
    {
        // Calculate the time that has elapsed since the last frame.
        let current = Date.now();
        let elasped = current - start;
        start = current;

        // Add the elapsed time to the lag counter.
        lag += elasped;

        while(lag >= frame_Duration)
        {
            for (let i = 0; i < world.Game_Objects.length; i++)
            {
                world.Game_Objects[i].On_Tick();
            }

            FInput_Handler.Do_Input();

            lag = 0;
        }

        let lag_Offset = lag / frame_Duration;
        FRenderer.Render();

        requestAnimationFrame(() =>
        {
            step();
        });
    }
    step();
}