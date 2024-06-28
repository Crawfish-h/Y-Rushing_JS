class YAStar extends YObject
{
    /**
     * Constructs a YAStar object that is used to allow for pathfinding of various objects.
     * @param {(number, number, number, number) => { number }} heuristic The heuristic function should contain 4 arguments of type "number" and return a value of the same type.
     */
    constructor(heuristic)
    {
        super(FUtility.Object_Tags.Utility, "AStar");

        this.Heuristic = heuristic || YAStar.Defualt_Heuristics.Manhattan;
    }

    static Defualt_Heuristics = 
    {
        Manhattan: (x, y, other_X, other_Y) => { return Math.abs(x - other_X) + Math.abs(y - other_Y); },
        Euclidean: (x, y, other_X, other_Y) => { Math.sqrt(Math.abs(other_X - x)^2 + Math.abs(other_Y - y)^2) }
    }

    /**
     * Calculates the g distance which is the distance from the start to the node.
     * @param {YGrid_Node} node The node to use for calculations.
     * @param {{X: number, Y: number}} start Can be any object that has an X and Y attribute. 
     * @returns {number} The g distance.
     */
    Get_G(node, start)
    {
        return YAStar.Defualt_Heuristics.Euclidean(start.X, start.Y, node.X, node.Y);
    }

    /**
     * Calculates the h distance which is the distance from the node to the target location.
     * @param {YGrid_Node} node The node to use for calculations.
     * @param {{X: number, Y: number}} end Can be any object that has an X and Y attribute. 
     * @returns {number} The g distance.
     */
    Get_H(node, end)
    {
        return this.Heuristic(node.X, node.Y, end.X, end.Y);
    }
    
    /**
     * Calculates the f distance which is the sum of the h and g values.
     * @param {YGrid_Node} node The node to use for calculations.
     * @param {{X: number, Y: number}} start Can be any object that has an X and Y attribute. 
     * @param {{X: number, Y: number}} end Can be any object that has an X and Y attribute. 
     * @returns {number} The f distance.
     */
    Get_F(node, start, end)
    {
        return this.Get_G(node, start) + this.Get_H(node, end);
    }

    /**
     * Finds a path from path_Finder to path_Target.
     * @param {YGrid} grid The grid that will be searched.
     * @param {YGame_Object} pathfinder The YGame_Object that will path find. 
     * @param {YGame_Object} path_Target The target of the pathfinding. 
     * @param {boolean} diagonals If true, also return diagonal nodes.
     * @returns {[YGrid_Node] | null} Returns a list of nodes if pathfinding was successfull. Otherwise, returns null.
     */
    Find_Path(grid, pathfinder, path_Target, diagonals)
    {
        // WIP: Add a way for the size of the pathfinder and the path_Target to be used in the Move_Pathfinder function. Tip: create a YObject path data system.
        this.Find_Path_Internal(grid, pathfinder, path_Target, diagonals, pathfinder.Object_Size, path_Target.Object_Size);
    }

    /**
     * Finds a path from path_Finder to path_Target.
     * @param {YGrid} grid The grid that will be searched.
     * @param {{X: number, Y: number}} pathfinder_XY Can be any object that has an X and Y attribute. 
     * @param {{X: number, Y: number}} path_Target_XY Can be any object that has an X and Y attribute. 
     * @param {boolean} diagonals If true, also return diagonal nodes.
     * @param {Width: number, Height: number} size_Target The sizes of the target. Values of 30 should be good enough most of the time.
     * @param {Width: number, Height: number} size_Finder The sizes of the path finder. Values of 30 should be good enough most of the time.
     * @returns {[YGrid_Node] | null} Returns a list of nodes if pathfinding was successfull. Otherwise, returns null.
     */
    Find_Path_XY(grid, pathfinder_XY, path_Target_XY, diagonals, size_Finder= { Width: 30, Height: 30 }, size_Target= { Width: 30, Height: 30 })
    {
        this.Find_Path_Internal(grid, pathfinder_XY, path_Target_XY, diagonals, size_Finder, size_Target);
    }

    /**
     * Finds a path from path_Finder to path_Target.
     * @param {YGrid} grid The grid that will be searched.
     * @param {{X: number, Y: number}} path_Finder Can be any object that has an X and Y attribute. 
     * @param {{X: number, Y: number}} path_Target Can be any object that has an X and Y attribute. 
     * @param {boolean} diagonals If true, also return diagonal nodes.
     * @param {Width: number, Height: number} size_Target The sizes of the target. Values of 30 should be good enough most of the time.
     * @param {Width: number, Height: number} size_Finder The sizes of the path finder. Values of 30 should be good enough most of the time.
     * @returns {[YGrid_Node] | null} Returns a list of nodes if pathfinding was successfull. Otherwise, returns null.
     */
    Find_Path_Internal(grid, path_Finder, path_Target, diagonals, size_Finder= { Width: 30, Height: 30 }, size_Target= { Width: 30, Height: 30 })
    {
        let open_List = [];
        let closed_List = [];
        let target_Node;
        let start_Node;
        
        
        for (let i = 0; i < grid.Node_List.length; i++)
        {
            let node = grid.Node_List[i];
            if (FUtility.XY_Touching_XY(node.X, node.Y, path_Target.X, 
                path_Target.Y, node.Object_Size, size_Target) == true)
            {
                target_Node = node;
            }

            if (FUtility.XY_Touching_XY(node.X, node.Y, path_Finder.X, 
                path_Finder.Y, node.Object_Size, size_Finder) == true)
            {
                start_Node = node;
            }
        }

        open_List.push(start_Node);

        //target_Node.Image.Destroy();
        //target_Node.Destroy();

        if (target_Node === undefined)
        {
            console.log("Pathfiding failed.");
            return false;
        }

       

        FUtility.Repeat_Until(()=>
        {
            // Grab the lowest f value to process next.
            let low_Index = 0;
            for (let i = 0; i < open_List; i++)
            {
                if (this.Get_F(open_List[i], path_Finder, target_Node) < 
                    this.Get_F(open_List[low_Index], path_Finder, target_Node))
                { low_Index = i }
            }

            let current_Node = open_List[low_Index];

            // Normal case: move current_Node from open to closed and process of each its neighbors.
            open_List = open_List.filter(function(n) { return n.UID != current_Node.UID; })
            closed_List.push(current_Node);

            let neighbors = grid.Neighbors(current_Node, diagonals);
            console.log("neighbors.length: " + neighbors.length);

            for (let i = 0; i < neighbors.length; i++)
            {
                let neighbor = neighbors[i];
                if (closed_List.filter(function(n) { return n.UID == neighbor.UID; }) != []
                    || neighbor.Is_Active == false)
                {
                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // G distance is the shortest distance from the start to current node, we need to check if
                // the path we have arrivaed at this neighbor is the shortest one we have seen yet.
                let g_Distance = this.Get_G(current_Node, path_Finder) + current_Node.Object_Size.Width; // Object_Size.Width is the distance from a node to its neighbor (?). 
                let g_Distance_Is_best = false;

                if (open_List.filter(function(n) { return n.UID == neighbor.UID; }) == [])
                {
                    // This is the first time we have arrived at this node, it must be the best.

                    g_Distance_Is_best = true;
                    open_List.push(neighbor);
                }else if (g_Distance < this.Get_G(neighbor, path_Finder))
                {
                    // We have already seen the node, but last time it had a worse g (distance from start).
                    g_Distance_Is_best = true;
                }

                if (g_Distance_Is_best)
                {
                    // Found an optimal (so far) path to this node. Store info on how we got here and
                    // just how good it really is...
                    neighbor.Parent = current_Node;
                }
            }

            // End case: result has been found, return the traced path.
            if (current_Node.X == target_Node.X &&
                current_Node.Y == target_Node.Y)
            {
                let curr = current_Node;
                let path_Nodes = [];
                while (curr.parent)
                {
                    path_Nodes.push(curr);
                    curr = curr.Parent;
                }
                console.log("Target found");

                this.Move_Pathfinder(path_Nodes.reverse(), path_Finder, path_Target, size_Finder, size_Target);
                return true;
            }

            console.log("X: %d, Y: %d", current_Node.X, current_Node.Y);

            if (open_List.length < 1) return true;
                else return false;
        });


    }

    /**
     * Moves the pathfinder to the path_Target after YAStar.Find_Path_Internal() has ran.
     * @param {YGrid_Node[]} node_List The list of nodes that the pathfinder will move to in order to reach the path_Target.
     * @param {{X: number, Y: number}} pathfinder Can be any object that has an X and Y attribute. 
     * @param {{X: number, Y: number}} path_Target Can be any object that has an X and Y attribute. 
     * @param {{Width: number, Height: number}} size_Target The sizes of the target.
     * @param {{Width: number, Height: number}} size_Finder The sizes of the path finder.
     */
    Move_Pathfinder(node_List, pathfinder, path_Target, size_Finder, size_Target)
    {
        let i = 0;
        FUtility.Repeat_Until(()=>
        {
            let node = node_List[i];
            if (FUtility.XY_Touching_XY(pathfinder.X, pathfinder.Y, 
                node.X, node.Y, size_Finder, node.Object_Size))
            {
                if (i != node_List.length - 1)
                {
                    i++
                }else
                {
                    return true;
                }
            }

            if (pathfinder.X < node.X) pathfinder.X += move_Speed;
            if (pathfinder.X > node.X) pathfinder.X -= move_Speed;
            if (pathfinder.Y < node.Y) pathfinder.Y += move_Speed;
            if (pathfinder.Y > node.Y) pathfinder.Y -= move_Speed;
        });

        node_List = [];
    }
}