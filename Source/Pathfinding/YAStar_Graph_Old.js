class YAStar_Graph extends YObject
{
    /**
     * @param {String} tag 
     * @param {String} name 
     * @param {[{String: number}]} cost_List 
     * @param {number} node_Density 
     * @param {number} node_Max_Distance // how much distance between each node (kinda).
     */
    constructor(tag, name, cost_List= [ {[FUtility.Object_Tags.Concrete_Floor]: 0}, {[FUtility.Object_Tags.Dirt_Floor]: 10} ], node_Density= 3.0, node_Max_Distance= 30)
    {
        super(tag, name);

        this.Cost_List = cost_List;
        this.Node_Density = node_Density;
        this.Node_Density_Defualt = 3.0;
        this.Node_Max_Distance = node_Max_Distance;

        // An object of arrays of arrays of YPath_Nodes. 
        // Each sub array is full of YPath_Nodes made from 1 Create_Nodes() function call.
        // Pseudo example of what this object should look like: {GEnemy_Base.UID: [[Nodes from 1 function call]]}.
        // Another example: {"UID 1": { "pathfinder": GEnemy_Base(), "nodes": [[new YPath_Node()], [new YPath_Node(), new YPath_Node()]] }, "UID 2": { "pathfinder": GEnemy_Base(), "nodes": [[new YPath_Node()], [new YPath_Node()]] }}.
        this.Node_Group_List = {}; 
    }

    Create_Node_Group(origin_X, origin_Y, center_X, center_Y, target_X, target_Y, node_Size= 50)
    {
        if (center_X != null && center_Y != null)
        {
            //let node = new YPath_Node(FUtility.Object_Tags.Utility, center_X, center_Y, origin_X, origin_Y, target_X, target_Y);
        }

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

        let node_List = [];

        for (let i = 0; i < this.Node_Density; i++)
        {
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


                let node = new YPath_Node(FUtility.Object_Tags.Utility, x_Pos, y_Pos, origin_X, origin_Y, target_X, target_Y, node_Size);

                if (node.Is_Touching_XY(target_X, target_Y, node_Size, node_Size) == true)
                {
                    return { reached_Target: true, nodes: [node] };
                }

                node_List.push(node);
            }
        }

        return { reached_Target: false, nodes: node_List };
    }

    /**
     * Gets the node in a node group with the highest specified distance value.
     * @param {{reached_Target: boolean, nodes: YPath_Node[]}} node_Return_Val The return value of the function "this.Create_Node_Group()'.
     * @param {string} distance_Type This value should be either h, g, or f.
     * @returns {YPath_Node[]} The node with the highest h/g/f distance.
     */
    Get_Node_Value_(node_Return_Val, distance_Type)
    {
        let i = node_Return_Val.nodes.length;
        let distance_Values = [];
        while(i--)
        {
            if (node_Return_Val.nodes[i].Is_Active == false)
            {
                node_Return_Val.nodes.splice(i, 1);;
            }else
            {
                distance_Values.push(node_Return_Val.nodes[i].F_Distance);
            }
        }
    }

    /**
     * Gets the node in a node group with the highest specified distance value.
     * @param {{reached_Target: boolean, nodes: YPath_Node[]}} node_Return_Val The return value of the function "this.Create_Node_Group()'.
     * @param {string} distance_Type This value should be either h, g, or f.
     * @returns {YPath_Node[]} An array of nodes with the highest h/g/f distances.
     */
    Get_Node_Value(node_Return_Val, distance_Type)
    {
        let highest_Distance = 0;
        let high_Distance_Nodes = [];
        let indexes_To_Splice = [];

        for (let i = 0; i < node_Return_Val.nodes.length; i++)
        {
            if (node_Return_Val.nodes[i].Is_Active == false)
            {
                // Store indexes here instead of splicing them immediately because it might break the for loop.
                indexes_To_Splice.push(i);
                continue;
            }

            if (high_Distance_Nodes.length == 0) 
            {
                high_Distance_Nodes.push(node_Return_Val.nodes[i]);
                continue;
            }
            
            let distance = 0;
            let other_Distance = 0;
            switch (distance_Type)
            {
                case "h":
                    distance = node_Return_Val.nodes[i].H_Distance;
                    other_Distance = high_Distance_Nodes[0].H_Distance;
                    break;
                case "g":
                    distance = node_Return_Val.nodes[i].G_Distance;
                    other_Distance = high_Distance_Nodes[0].G_Distance;
                    break;
                case "f":
                    distance = node_Return_Val.nodes[i].F_Distance;
                    other_Distance = high_Distance_Nodes[0].F_Distance;
                    break;
                default:
                    distance = node_Return_Val.nodes[i].H_Distance;
                    other_Distance = high_Distance_Nodes[0].H_Distance;
                    break;
            }

            if (distance < other_Distance)
            {
                high_Distance_Nodes = [];
                high_Distance_Nodes.push(node_Return_Val.nodes[i]);
            }else if (distance == other_Distance)
            {
                high_Distance_Nodes.push(node_Return_Val.nodes[i]);
            }
        }
        
        for (let i = 0; i < indexes_To_Splice.length; i++)
        {
            node_Return_Val.nodes.splice(indexes_To_Splice[i], 1);
        }

        return high_Distance_Nodes;
    }

    /**
     * Moves the pathfinder to a node over the course of several frames. 
     * @param {YGame_Object} pathfinder 
     * @param {YGame_Object} target_Object This can also be an object of the value of { X: number, Y: number }.
     * @param {number} move_Speed 
     */
    Move_To_Node(pathfinder, target_Object, move_Speed)
    {
        while (pathfinder.Is_Touching_XY(target_Object.X, target_Object.Y, 
            pathfinder.Object_Size.Width, pathfinder.Object_Size.Height))
        {
            if (pathfinder.X < target_Object.X) pathfinder.X += move_Speed;
            if (pathfinder.X > target_Object.X) pathfinder.X -= move_Speed;
            if (pathfinder.Y < target_Object.Y) pathfinder.Y += move_Speed;
            if (pathfinder.Y > target_Object.Y) pathfinder.Y -= move_Speed;
        }
    }

    /**
     * Generates the nodes that will tell the pathfinder where to go.
     * @param {YGame_Object} pathfinder 
     * @param {YGame_Object} target_Object This can also be an object of the value of { X: number, Y: number }.
     * @param {number} node_Size 
     * @param {number} move_Speed 
     */
    Generate_Nodes(pathfinder, target_Object, move_Speed, node_Size= 50)
    {
        let node_Return_Val = { reached_Target: false, nodes: [] };
        let node_Center_X = pathfinder.X;
        let node_Center_Y = pathfinder.Y;
        let nodes_Move_To = []; // An array of nodes that the pathfinder will move to.
        let nodes = [];
        let move_Itr = 0;
        let current_Node;

        let move_Pathfinder = ()=>
        {
            if (pathfinder.Is_Touching_Object(target_Object, false))
            {
                return true;
            }else
            {
                console.log("move_Itr: " + move_Itr);

                if (move_Itr <= nodes_Move_To.length - 1)
                {
                    if (pathfinder.Is_Touching_Object(current_Node, false) && move_Itr < nodes_Move_To.length)
                    {
                        move_Itr++;
                        current_Node = nodes_Move_To[move_Itr];
                    }
                }
                
                //console.log("EX: %d, EY: %d.  PX: %d, PY: %d", pathfinder.X, pathfinder.Y, node.X, node.Y);
                if (pathfinder.X < current_Node.X) pathfinder.X += move_Speed;
                if (pathfinder.X > current_Node.X) pathfinder.X -= move_Speed;
                if (pathfinder.Y < current_Node.Y) pathfinder.Y += move_Speed;
                if (pathfinder.Y > current_Node.Y) pathfinder.Y -= move_Speed;
                return false;
            }
        };
        
        FUtility.Repeat_Until(()=>
        {
            node_Return_Val = this.Create_Node_Group(pathfinder.X, pathfinder.Y, node_Center_X, node_Center_Y, target_Object.X, target_Object.Y, node_Size);
            if (node_Return_Val.reached_Target == false)
            {
                nodes = this.Get_Node_Value(node_Return_Val, "h");
                node_Center_X = nodes[0].X;
                node_Center_Y = nodes[0].Y;
                node_Return_Val.nodes = nodes;
                if (nodes.length > 1)
                {
                    nodes = this.Get_Node_Value(node_Return_Val, "h");
                    node_Center_X = nodes[0].X;
                    node_Center_Y = nodes[0].Y;
                    node_Return_Val.nodes = nodes;
                    if (nodes.length > 1)
                    {
                        nodes = this.Get_Node_Value(node_Return_Val, "g");
                        node_Center_X = nodes[0].X;
                        node_Center_Y = nodes[0].Y;
                    }
                }

                nodes_Move_To.push(nodes[0]);
                
                return false;
            }else
            {
                current_Node = nodes_Move_To[0];
                FUtility.Repeat_Until(move_Pathfinder);
                return true;
            }
        });
        

        if (node_Return_Val.reached_Target == true && node_Return_Val.nodes.length == 1)
        {
            //this.Move_To_Node(pathfinder, target_Object, move_Speed);
        }
    }

    /**
     * Starts the pathfinding sequence.
     * @param {YGame_Object} pathfinder 
     * @param {YGame_Object} target_Object This can also be an object of the value of { X: number, Y: number }.
     * @param {number} node_Size 
     * @param {number} move_Speed 
     */
    Find_Path(pathfinder, target_Object, move_Speed, node_Size= 50)
    {
        setTimeout(this.Generate_Nodes.bind(this), 100, pathfinder, target_Object, move_Speed, node_Size);
        
        /*FUtility.Repeat_Until(()=>
        {
            if (pathfinder.Is_Touching_Object(target_Object, false))
            {
                return true;
            }else
            {
                console.log("EX: %d, EY: %d.  PX: %d, PY: %d", pathfinder.X, pathfinder.Y, target_Object.X, target_Object.Y);
                if (pathfinder.X < target_Object.X) pathfinder.X += move_Speed;
                if (pathfinder.X > target_Object.X) pathfinder.X -= move_Speed;
                if (pathfinder.Y < target_Object.Y) pathfinder.Y += move_Speed;
                if (pathfinder.Y > target_Object.Y) pathfinder.Y -= move_Speed;
                return false;
            }
        }, {condition: false});*/
    }
    
    /**
     * Creates 9 nodes (with the center node at the location specified)(WIP: this shouldn't be true. Fix it).
     * @param node_Size This determines the size and the distance between each node.
     * @param node_Group_Num This value is the number of groups of nodes that currently exist. A single node group is: [YPath_Node(...), ...].
     * @returns Returns false if nothing was removed. Returns true if the YObject was removed.
     */
    Create_Nodes_Old(uID, node_Group_Num, node_Size= 70, center_Node_X, center_Node_Y, origin_X, origin_Y, target_X, target_Y)
    {
        let iter_Size = 0;
        for (let i = this.Node_Max_Size; i > node_Size; i -= 10)
        {
            iter_Size++;
        }
    
        for (let i = 0; i < 3 + iter_Size; i++)
        {
            for (let j = 0; j < 3 + iter_Size; j++)
            {
                let x_Pos = (center_Node_X - node_Size) + j * node_Size;
                let y_Pos = (center_Node_Y - node_Size) + i * node_Size;
                let node = new YPath_Node(FUtility.Object_Tags.Utility, "Path Node", x_Pos,
                    y_Pos, origin_X, origin_Y, target_X, target_Y); // WIP: Change the way tags work for nodes. Add a cost system.
                
                this.Node_Group_List[uID]["nodes"][node_Group_Num].push(node);
            }
        }
    }

    Find_Path_Old(uID, node_Size= 70, center_Node_X, center_Node_Y, origin_X, origin_Y, target_X, target_Y)
    {
        this.Node_Group_List[uID]["pathfinder"] = null;
        if (node_Size > this.Node_Max_Size) node_Size = this.Node_Max_Size;

        for (let i = 0; i < 4000; i++)
        {
            this.Create_Nodes(uID, i, node_Size, center_Node_X, center_Node_Y, origin_X, origin_Y, target_X, target_Y);
            let node_Group = this.Node_Group_List[uID]["nodes"][i];
            let f_Values = [];

            for (let j = 0; j < node_Group.length; j++)
            {
                f_Values.push(node_Group[j].f_Distance);
            }
            
            let min_F_Value = Math.min(...f_Values);

            if (f_Values.indexOf(min_F_Value) == f_Values.lastIndexOf(min_F_Value))
            {
                for (let j = 0; j < node_Group.length; j++)
                {
                    if (min_F_Value == node_Group[j].f_Distance)
                    {
                        
                    }
                }
            }
        }
    }
}