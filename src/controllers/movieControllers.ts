import { Request, Response } from "express";
import { Types } from "mongoose";

// Model
import { MovieModel } from "../models/Movie";

// Logger
import Logger from "../../config/logger";

/////////////////////////////////////////////////////
// Abaixo está o código igual da aula, mas no router.ts o VScode acusava um erro de tipagem da função createMovie. Então tipamos a função para que sempre seja retornado uma Promise<void> e removemos as keywords "return" do try catch
/////////////////////////////////////////////////////

// export async function createMovie(req: Request, res: Response) {
//   try {
//     const data = req.body;
//     const movie = await MovieModel.create(data);
//     return res.status(201).json(movie);
//   } catch (error: any) {
//     Logger.error(`Erro no sistema: ${error.message}`);
//   }
// }

export async function createMovie(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    res.status(201).json(movie);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
    res.status(500).json({ error: "Erro no sistema" });
  }
}

export async function findMovieById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = req.params.id;
    const movie = await MovieModel.findById(id);

    if (!movie) {
      res.status(404).json({ error: "O filme não existe." });
    }

    res.status(200).json(movie);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
    res.status(500).json({ error: "Erro no sistema" });
  }
}

/////////////////////////////////////////////////////
// Abaixo está o código igual da aula, mas no router.ts o VScode acusava um erro de tipagem da função findMovieById. Então tipamos a função para que sempre seja retornado uma Promise<void> e removemos as keywords "return".
/////////////////////////////////////////////////////

// export async function findMovieById(req: Request, res: Response) {
//   try {
//     const id = req.params.id;
//     const movie = await MovieModel.findById(id);

//     if (!movie) {
//       return res.status(404).json({ error: "O filme não existe." });
//     }

//     return res.status(200).json(movie);
//   } catch (error: any) {
//     Logger.error(`Erro no sistema: ${error.message}`);
//   }
// }

export async function getAllMovies(req: Request, res: Response): Promise<void> {
  try {
    const movies = await MovieModel.find();
    res.status(200).json(movies);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
    res.status(500).json({ error: "Erro no sistema" });
  }
}

// export async function removeMovie(req: Request, res: Response): Promise<void> {
//   try {
//     const id = req.params.id;

//     if (!Types.ObjectId.isValid(id)) {
//       res.status(404).json({ error: "Id inválido." });
//     }

//     const movie = await MovieModel.findById(id);

//     if (!movie) {
//       res.status(404).json({ error: "O filme não existe." });
//     }

//     await movie?.deleteOne();
//     res.status(200).json({ msg: "Filme removido com sucesso!" });
//   } catch (error: any) {
//     Logger.error(`Erro no sistema: ${error}`);
//     res.status(500).json({ error: "Erro no sistema!" });
//   }
// }

export async function removeMovie(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { id } = req.params;

    // Verifica se o ID é válido no formato ObjectId do MongoDB
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" }); // Retorna imediatamente após o erro
    }

    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "O filme não existe." }); // Retorna imediatamente após o erro
    }

    await movie.deleteOne();
    Logger.info("Filme removido com sucesso");

    return res.status(200).json({ msg: "Filme removido com sucesso." }); // Retorna após a remoção
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error}`);
    return res.status(500).json({ error: "Erro no sistema!" }); // Retorna imediatamente após o erro
  }
}

export async function updateMovie(
  req: Request,
  res: Response
): Promise<Response | void> {
  try {
    const { id } = req.params;
    const data = req.body;
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ msg: "O filme não existe." });
    }

    console.log(movie.title);

    await MovieModel.updateOne({ _id: id }, data);
    return res.status(200).json({ msg: "Filme editado com sucesso!" });
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error}`);
    return res.status(500).json({ error: "Erro no sistema!" }); // Retorna imediatamente após o erro
  }
}
