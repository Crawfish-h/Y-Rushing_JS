class YState extends YObject
{
    // "state_List" is the list that this YState is in. 
    constructor(state_Type= YState.State_Types.Idle, state_List= [])
    {
        super(FUtility.Object_Tags.Utility, state_Type);
        this.State_List = state_List;
        
    }



    static State_Types = 
    {
        Idle: "Idle",
        Moving: "Moving",
        Attacking: "Attacking",
        Damaged: "Damaged",
        Dead: "Dead",
    }
}