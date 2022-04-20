import pathlib
import os
from os import path
from tqdm import tqdm

PIPE_PREFIX = "│   "
SPACE_PREFIX = "    "
PIPE = "│"
ELBOW = "└──"
TEE = "├──"

ignoreDirectory = ['node_modules', '.git']

def generate_directory(
    tree, item, index, len_diritems, prefix, connector):
    tree.append(f"{prefix}{connector} {item.name}{os.sep}")
    if index != len_diritems - 1:
        prefix += PIPE_PREFIX
    else:
        prefix += SPACE_PREFIX
    add_body(tree, item, prefix)
    tree.append(prefix.rstrip())

def add_root(tree, root_directory):
    tree.append(f"{root_directory.name}{os.sep}")
    tree.append(PIPE)

def add_body(tree, root_directory, prefix=""):
    dir_iter = root_directory.iterdir()
    diretory_items = sorted(dir_iter, key=lambda item: item.is_file())
    len_diritems = len(diretory_items)
    for index, item in tqdm(enumerate(diretory_items)):
        connector = ELBOW if index == len_diritems - 1 else TEE
        if item.is_dir() and not item.name in ignoreDirectory:
            generate_directory(
                tree, item, index, len_diritems, prefix, connector)
        else:
            # Check if item.name is a file named README.txt
            if item.name == "README.txt":
                # Loop through file and print content
                with open(item, "r") as f:
                    for line in f:
                        tree.append(f"{prefix}{connector} {line.strip()}")
            # Adds file to tree
            # tree.append(f"{prefix}{connector} {item.name}")

def make_tree(root_directory):
    tree = []
    add_root(tree, root_directory)
    add_body(tree, root_directory)
    return tree

# directory = "./"
# set directory to the current directory
directory = os.getcwd()
try:
    root_directory = pathlib.Path(directory)
    tree = make_tree(root_directory)
    for item in tree:
        print(item)
except Exception as e:
    raise e