class YGrid extends YGame_Object
{
    /**
     * @param {[{String: number}]} cost_List 
     * @param {number} node_Size
     * @param {number} node_Density 
     * @param {number} node_Max_Distance // how much distance between each node (kinda).
     */
    constructor(x, y, cost_List= [ {[FUtility.Object_Tags.Concrete_Floor]: 0}, {[FUtility.Object_Tags.Dirt_Floor]: 10} ], node_Size, node_Density= 3.0, node_Max_Distance= 30)
    {
        super(x, y, FUtility.Object_Tags.Utility, "Grid");

        this.Cost_List = cost_List;
        this.Node_Density = node_Density;
        this.Node_Density_Defualt = 3.0;
        this.Node_Max_Distance = node_Max_Distance;
        this.Node_Size = node_Size;
        this.Node_List = [[]]; 
        this.Current_Number_Of_Nodes = 0;

        this.#Generate_Nodes(this.X, this.Y, this.Node_Size);
    }

    /**
     * Creates a copy of an YGrid.Node_List that was converted into numbers. Does not effect YGrid.Node_List.
     * @returns {number[]} An array of numbers that have been converted from YGrid_Nodes to numbers. 
     */
    Convert_List()
    {
        let new_List = [];
        for (let i = 0; i < this.Node_List.length; i++)
        {
            new_List.push([]);
            for (let j = 0; j < this.Node_List.length; j++)
            {
                if (this.Node_List[i][j].Is_Active == false)
                {
                    console.log("1 was pushed");
                    new_List[i].push(1); // A truthy value means there is an obstacle here.
                }else
                {
                    new_List[i].push(0); // A falsy value means there is nothing there, a pathfinder can move here.
                }
            }
        }

        return new_List;
    }

    /**
     * Returns an array of YGrid_Nodes that are colliding/touching the pos_XY position. Returns an empty array if no such nodes could be found.
     * @param {{X: number, Y: number}} pos_XY The position to search for. If this is a YGame_Object, the size argument is not required.
     * @param {{Width: number, Height: number}} size The (not always required) size we should use when testing collisions with this xy position.
     * @returns {YGrid_Node[]} An array of YGrid_Nodes that are colliding/touching the pos_XY position.
     */
    Find_XY(pos_XY, size= undefined)
    {
        let nodes = [];
        if ((pos_XY instanceof YGame_Object) == true && size == undefined)
        {
            size = pos_XY.Object_Size;
        }

        for (let i = 0; i < this.Node_List.length; i++)
        {
            for (let j = 0; j < this.Node_List.length; j++)
            {
                let node = this.Node_List[i][j];
                if (FUtility.XY_Touching_XY(node.X, node.Y, pos_XY.X, 
                    pos_XY.Y, node.Object_Size, size) == true)
                {
                    nodes.push(node);
                }
            }
        }

        return nodes;
    }

    #Generate_Nodes(center_X, center_Y, node_Size= 50)
    {
        // Calculate the correct distance between each node.
        let node_Size_Result = (this.Node_Density / this.Node_Density_Defualt) * 10.0;
        //if (node_Size_Result < ((this.Node_Density_Defualt + 1.0) / this.Node_Density_Defualt) * 10) node_Size_Result = 0;
    
        let node_Distance = this.Node_Max_Distance;//(node_Size - node_Size_Result) * 1.5; // The Distance between each node.
        let node_Defualt_Distance = this.Node_Max_Distance; // The defualt distance between each node.

        for (let i = 3; i < this.Node_Density; i++)
        {
            node_Distance -= this.Node_Max_Distance / this.Node_Density;
        }

        if (this.Node_Density > this.Node_Density_Defualt)
        {
            //node_Distance *= 0.7;
        }

        for (let i = 3; i < this.Node_Density_Defualt; i++)
        {
            node_Defualt_Distance -= this.Node_Max_Distance / this.Node_Density_Defualt;
        }

        // The position of nodes should be based on the top left to the center_X and center_Y;
        let top_Left_X = 0;
        let top_Left_Y = 0;

        for (let i = 0; i < this.Node_Density_Defualt - 1; i++)
        {
            top_Left_X -= node_Defualt_Distance;
            top_Left_Y -= node_Defualt_Distance;
        }

        top_Left_X /= this.Node_Density_Defualt;
        top_Left_Y /= this.Node_Density_Defualt;

        top_Left_X -= node_Defualt_Distance * 0.35;
        top_Left_Y -= node_Defualt_Distance * 0.35;

        //let node = new YPath_Node(FUtility.Object_Tags.Utility, center_X + top_Left_X, center_Y + top_Left_Y, origin_X, origin_Y, target_X, target_Y);

        let x_Pos_Defualt = center_X + top_Left_X + node_Defualt_Distance * (this.Node_Density_Defualt - 1);
        let y_Pos_Defualt = center_Y + top_Left_Y + node_Defualt_Distance * (this.Node_Density_Defualt - 1);

        for (let i = 0; i < this.Node_Density; i++)
        {
            this.Node_List.push([]);
            for (let j = 0; j < this.Node_Density; j++)
            {
                let x_Pos = center_X + top_Left_X + node_Distance * i;
                let y_Pos = center_Y + top_Left_Y + node_Distance * j;
                
                if (x_Pos > x_Pos_Defualt * 1)
                {
                    x_Pos -= x_Pos - x_Pos_Defualt;
                }

                if (y_Pos > y_Pos_Defualt * 1)
                {
                    y_Pos -= y_Pos - y_Pos_Defualt;
                }


                let node = new YGrid_Node(FUtility.Object_Tags.Utility, j, i, x_Pos, y_Pos, node_Size);

                this.Node_List[i].push(node);
                this.Current_Number_Of_Nodes++;
            }
        }

        // I'm not 100% sure why, but this.Node_List[i].length has a larger value than this.Node_Density 
        // which means it also has a larger value than this.Node_List[i][j].length. So, this statement is here
        // to make sure that the lengths have the correct values. I think the reason for this is because of the position of this.Node_List.push([]);
        if (this.Node_List.length > this.Node_Density)
        {
            for (let i = this.Node_List.length; i > -1; i--)
            {
                if (this.Node_List[i] == undefined || this.Node_List[i].length == 0)
                {
                    this.Node_List.splice(i, 1);
                }
            }
        }


        console.log("Number of grid nodes: " + this.Current_Number_Of_Nodes);
    }

    /**
     * Returns the nodes that surround a node.
     * @param {YGrid_Node} node The node to get its neighbors from.
     * @param {boolean} diagonals If true, also return diagonal nodes.
     * @returns {[YGrid_Node]} The nodes that surround a node.
     */
    Neighbors(node, diagonals= true)
    {
        let nodes = [];

        let area_Checker = new YGrid_Node(FUtility.Object_Tags.Utility, node.X, node.Y , node.Size * 10.5);

        let get_Node = (x, y) =>
        {
            list_For: for (let i = 0; i < this.Node_List.length; i++)
            {
                /*if (this.Node_List[i].X == node.X + x && 
                    this.Node_List[i].Y == node.Y + y)*/
                if (this.Node_List[i].Is_Touching_Object(area_Checker) == true )
                {
                    for (let j = 0; j < nodes.length; j++)
                    {
                        if (nodes[j].UID == this.Node_List[i].UID || nodes[j].UID == node.UID) 
                            continue list_For;
                    }

                    this.Node_List[i].Image.Destroy();
                    console.log(this.Node_List[i].UID);
                    nodes.push(this.Node_List[i]);
                }
            }
        }

        // West.
        get_Node(-node.Object_Size.Width, 0);

        // East.
        get_Node(node.Object_Size.Width, 0);

        // South.
        get_Node(0, -node.Object_Size.Height);

        // North.
        get_Node(0, node.Object_Size.Height);

        if (diagonals == true)
        {
            // Southwest.
            get_Node(-node.Object_Size.Width, -node.Object_Size.Height);

            // Southeast.
            get_Node(node.Object_Size.Width, -node.Object_Size.Height);

            // Northwest.
            get_Node(-node.Object_Size.Width, node.Object_Size.Height);

            // Northeast.
            get_Node(node.Object_Size.Height, node.Object_Size.Height);
        }

        //area_Checker.Image.Destroy();
        //area_Checker.Destroy();
        //area_Checker = null;

        return nodes;
    }
}