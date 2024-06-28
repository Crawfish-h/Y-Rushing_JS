class FTrait_Object
{
    #Traits;

    /**
     * Creates a FTraits object that is used to tell the program how to use the object this FTraits belongs to.
     * @param {[string]} traits 
     */
    constructor(traits)
    {
        this.#Traits = traits;
    }

    /**
     * Adds a trait to the #Traits array.
     * There cannot be multiple traits of the same type in the #Traits array.
     * @param {string} trait 
     * @returns {boolean} Returns true if "trait" wasn't already inside the #Traits array.
     */
    Add(trait)
    {
        if (this.#Traits.includes(trait) == false)
        {
            this.#Traits.push(trait);
            return true;
        }else
        {
            return false;
        }
    }

    /**
     * Removes a trait from the #Traits array.
     * @param {string} trait 
     * @returns {boolean} Returns false if "trait" wasn't already inside the #Traits array.
     */
    Rem(trait)
    {
        if (this.#Traits.includes(trait) == true)
        {
            this.#Traits = this.#Traits.filter(function(t) { return t !== trait })
            return true;
        }else
        {
            return false;
        }
    }

    /**
     * Gets a trait from the #Traits array.
     * @param {string} trait 
     * @returns {string | null} Returns the trait if it is in the #Traits array. If the trait is not in the array, returns null.
     */
    Get(trait)
    {
        if (this.#Traits.includes(trait) == true)
        {
            return this.#Traits.filter(function(t) { return t === trait })[0];
        }else
        {
            return null;
        }
    }
}

class YObject
{
    constructor(tag= "", name= "", on_Tick, on_Input) 
    {
        this.Tag = tag;
        this.Name = name;
        this.UID = FUtility.Get_Unique_Id();
        this.Parent = FUtility.Current_World;
        this.Is_Active = true;
        this.Traits = new FTrait_Object([FTraits.Destroyable, FTraits.Is_Enabled, FTraits.Structure_Visible]);

        const empty_Func = ()=>{};
        //const empty_Input_Func = (key_Map= {})=>{};
        this.On_Tick = on_Tick || empty_Func;
        this.On_Input = on_Input || empty_Func;
        this.On_Click = empty_Func;

        FUtility.YObject_List.push(this);
    }

    /** Destroys this object. */
    Destroy()
    {   
        console.log("Name: %s", this.Name);
        this.Is_Active = false;
        FUtility.YObject_Remove_At(FRenderer.Render_List, this);
        FUtility.YObject_Remove_At(FUtility.YObject_List, this);
        FUtility.YObject_Remove_At(FUtility.Current_World.Game_Objects, this);
        this.Parent = null;
        this.X = -10000;
        this.Y = -10000;
    }
}