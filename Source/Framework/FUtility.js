class FUtility
{
    static #Current_Unique_Id = 0;
    static YObject_List = [];
    static Current_World;
    static Test_Number = 0;

    // The pathfinding utilities/systems currently in use.
    static PF_Grid; 
    static Y_Grid;
    static AStar;

    /**
     * Removes an element from a array if the elements UID matches a UID inside the array. 
     * @param {YObject} yobject The Object that will be removed. This arguemnt's class must be either a YObject or a child of it.
     * @param array The array that the object will be removd from.
     * @returns Returns false if nothing was removed. Returns true if the YObject was removed.
     */
    static YObject_Remove_At(array, yobject)
    {
        for (let i = 0; i < array.length; i++)
        {
            if (array[i].UID == yobject.UID)
            {
                array.splice(i, 1); // WIP: replace FRenderer.Render_List with the array argument.
                return true;
            }
        }

        return false;
    }

    /**
     * @param {number} x The x position that we are testing collisions/overlaps with.
     * @param {number} y The y position that we are testing collisions/overlaps with.
     * @param {number} other_X The second  x position that we are testing collisions/overlaps with.
     * @param {number} other_X The second y position that we are testing collisions/overlaps with.
     * @param {{Width: number, Height: number}} size The size of the first position that we are testing collisions/overlaps with.
     * @param {{Width: number, Height: number}} size_Other The size of the other/second position that we are testing collisions/overlaps with.
     * @returns Returns true if this is object is touching other_Object.
    */
    static XY_Touching_XY(x, y, other_X, other_Y, size, size_Other)
    {
        let x_Offset = 0;
        let y_Offset = 0;

        if (size_Other.Width != FRenderer.Frame_Size)
        {
            x_Offset = -size_Other.Width / 2;
        }

        if (size_Other.Height != FRenderer.Frame_Size)
        {
            y_Offset = -size_Other.Height / 2 + (FRenderer.Frame_Size - size_Other.Height) * 0.25;
        }

        if  (
                other_X + x_Offset < x + size.Width &&
                other_X + x_Offset + size_Other.Width > x &&
                other_Y + y_Offset < y + size.Height &&
                other_Y + y_Offset + size_Other.Height > y
            )
        {
            return true;
        }else
        {
            return false
        }
    }

    /**
     * @param {()=>{}} func This must return a boolean.
     * @param {{condition: false}} args An object that contains miscellaneous given by the caller.
     */
    static Repeat_Until(func, args= undefined)
    {
        let fps = 60;
        let start = Date.now();
        let frame_Duration = 1 / fps;
        let lag = 0;

        let step = () =>
        {
            let current = Date.now();
            let elasped = current - start;
            start = current;

            // Add the elapsed time to the lag counter.
            lag += elasped;

            let return_Value = false;
            if (lag >= frame_Duration)
            {
                return_Value = func(args);
            }

            if (return_Value == false)
            {
                requestAnimationFrame(() => 
                {
                    step();
                });
            }
        }

        step();
    }

    static Print_YObject_Structure()
    {
        for (let i = 0; i < FUtility.YObject_List.length; i++)
        {
            console.log("UID: %s, Name: %s, Tag: %s", FUtility.YObject_List[i].UID, FUtility.YObject_List[i].Name, FUtility.YObject_List[i].Tag);
        }
    }

    static Object_Tags = 
    {
        Player: "Player",
        Dirt_Floor: "Dirt_Floor",
        Concrete_Floor: "Concrete_Floor",
        Camera: "Camera",
        Enemy: "Enemy",
        Item: "Item",
        Utility: "Utility",
        Wall: "Wall",
        Trigger: "Trigger",
        Damage_Trigger: "Damage_Trigger",
        Destructable_item: "Destructable_item",
        Breakable: "Breakable"
    }

    static Directions =
    {
        Up: "Up",
        Down: "Down",
        Right: "Right",
        Left: "Left"
    }

    static Get_Unique_Id()
    {
        return this.#Current_Unique_Id++;
    }

    static IRandom_Range(min, max)
    {
        return parseInt(Math.random() * ((max + 1) - min) + min);
    }

    static FRandom_Range(min, max)
    {
        return Math.random() * ((max + 1) - min) + min;
    }
}

class FTraits 
{
    static Destroyable = "Destroyable";
    static Is_Enabled = "Is_Start_Enabled";
    static Structure_Visible = "Structure_Visible";
    static Is_Config = "Is_Config"
}