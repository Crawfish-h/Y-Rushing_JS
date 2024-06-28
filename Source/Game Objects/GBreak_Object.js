class GBreak_Object extends GImage_Object
{
    /**
     * Constructs and object that can be broken and then destroyed.
     * @param {number} x 
     * @param {number} y 
     * @param {number} health 
     * @param {string} image 
     * @param {string} tag 
     * @param {string} name 
     * @param {(break_Object)=>{}} break_Result The function that will be called when this object gets broken.
     */
    constructor(x, y, health, image, tag, name, break_Result)
    {
        super(x, y, image, tag, name);
        this.Health = health;
        this.Set_Size(40, 40);
        this.On_Overlap = this.Break_Overlap;
        this.Block_Move = true;
        this.Break_Result = break_Result;
    }

    Break_Overlap(other_Object)
    {
        if (this.Can_Overlap == true)
        {
            switch(other_Object.Tag)
            {
                case FUtility.Object_Tags.Damage_Trigger:
                    console.log("Break_Overlap()");
                    this.On_Damaged(other_Object.Parent)
                    break;
                default:
                    break;
            }
        }
    }

    On_Damaged(attacker)
    {
        this.Health -= attacker.Attack_Damage;
        if (this.Health <= 0)
        {
            this.Break_Result(this);
        }
    }
}