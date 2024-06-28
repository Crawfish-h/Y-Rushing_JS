class FRenderer
{
    static Game_Container;
    static Canvas;
    static Context;
    static Render_List = [];
    static Frame_Size = 120;
    static #Camera;

    static Set_Camera(camera)
    {
        FRenderer.#Camera = camera;
    }

    static Init()
    {
        FRenderer.Game_Container = document.querySelector(".game-container");
        FRenderer.Canvas = FRenderer.Game_Container.querySelector(".game-canvas");
        FRenderer.Context = FRenderer.Canvas.getContext("2d");
    }

    static Render()
    {
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        for (let i = 0; i < FRenderer.Render_List.length; i++)
        {
            let x_Pos = FRenderer.Render_List[i].X + FRenderer.#Camera.X + FRenderer.Render_List[i].Image_Offset.X + ((FRenderer.Frame_Size - FRenderer.Render_List[i].Image_Size.Width) * 0.5);
            let y_Pos = FRenderer.Render_List[i].Y + FRenderer.#Camera.Y + FRenderer.Render_List[i].Image_Offset.Y + ((FRenderer.Frame_Size - FRenderer.Render_List[i].Image_Size.Height) * 0.7);

            FRenderer.Context.drawImage(FRenderer.Render_List[i].Image, FRenderer.Frame_Size * FRenderer.Render_List[i].Current_Frame[0], 
                FRenderer.Frame_Size * FRenderer.Render_List[i].Current_Frame[1], FRenderer.Frame_Size, FRenderer.Frame_Size, x_Pos, y_Pos, 
                FRenderer.Render_List[i].Image_Size.Width, FRenderer.Render_List[i].Image_Size.Height);
        }
    }
}