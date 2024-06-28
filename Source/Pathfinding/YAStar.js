class YAStar extends YObject
{
    /**
     * Constructs a YAStar object that is used to allow for pathfinding of various objects.
     * @param {String} tag 
     * @param {String} name 
     */
    constructor(tag= FUtility.Object_Tags.Utility, name= "AStar")
    {
        super(tag, name);
    }


    /**
     * Moves an object along a path/array of nodes.
     * @param {YGrid} grid The grid the mover will traverse.
     * @param {{X: number, Y: number}} mover Can be a YGame_Object or any object with X and Y position variables.
     * @param {number[][]} path The path the mover will traverse. The each array element is made up of two sets of numbers.
     * @param {number} move_Speed The speed the mover uses to traverse the path.
     * @param {()=>{}} callback A function that will be executed right before this Move_To returns true.
     * @param {{Width: number, Height: number}} size The size of the mover. Is not required if mover's type is a YGame_Object;
     */
    Move_To(grid, mover, path, move_Speed, callback, size= undefined)
    {
        if (path.length == 0)
        {
            console.log("ERROR: path is empty!!");
            callback();
            return;
        }

        if ((mover instanceof YGame_Object) == true && size == undefined)
        {
            size = mover.Object_Size;
        }

        let i = 0;
        FUtility.Repeat_Until(()=>
        {
            let node = grid.Node_List[path[i][1]][path[i][0]];
            let node_Size = Math.max(size.Width, size.Height) / 1.5;

            if (FUtility.XY_Touching_XY(mover.X, mover.Y, 
                node.X, node.Y, size, {Width: node_Size, Height: node_Size}))
            {
                if (i != path.length - 1)
                {
                    i++
                }else
                {
                    callback();
                    return true;
                }
            }

            if (mover.X < node.X) mover.X += move_Speed;
            if (mover.X > node.X) mover.X -= move_Speed;
            if (mover.Y < node.Y) mover.Y += move_Speed;
            if (mover.Y > node.Y) mover.Y -= move_Speed;
            return false;
        });
    }
}